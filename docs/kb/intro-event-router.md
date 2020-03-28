---
layout: docs
title: VMware Event Broker Appliance
description: Update this
permalink: /kb/event-router
---

# VMware Event Router

The VMware Event Router is responsible for connecting to event `stream` sources, such as VMware vCenter, and forward events to an event `processor`. To allow for extensibility and different event sources/processors event sources and processors are abstracted via Go `interfaces`.

Currently, one VMware Event Router is deployed per appliance (1:1 mapping). Also, only one event stream (source) and one processor can be configured. The list of supported event sources and processors can be found [above](#components). That means, only one vCenter event stream can be processed per appliance. We are evaluating options to support multiple event sources (vCenter servers) and processors per appliance (scale up) or alternatively support multi-node appliance deployments (scale out), which might be required in large deployments (performance, throughput). 

> **Note:** We have not done any extensive performance and scalability testing to understand the limits of the single appliance model.

# Event Handling

As described in the architecture section [above](#architecture) due to the microservices architecture used in the vCenter Event Broker Appliance one always has to consider message delivery problems such as timeouts, delays, reordering, loss. These challenges are fundamental to [distributed systems](https://github.com/papers-we-love/papers-we-love/blob/master/distributed_systems/a-note-on-distributed-computing.pdf) and must be understood and considered by function authors.

## Event Types supported

For the supported event stream source, e.g. VMware vCenter, all events provided by that source can be used. Since event types are environment specific (vSphere version, extensions), a list of events for vCenter as an event source can be generated as described in this [blog post](https://www.virtuallyghetto.com/2019/12/listing-all-events-for-vcenter-server.html).

## Message Delivery Guarantees

Consider the following most basic form of messaging between two systems:

[PRODUCER]------[MESSAGE]----->[CONSUMER]  
[PRODUCER]<---[MESSAGE_ACK]---[CONSUMER]

Even though this example looks simple, a lot of things can go wrong when transferring a message over the network (vs in-process communication):

- The message might never be received by the consumer
- The message might arrive out of order (previous message not shown here)
- The message might be delayed during transport
- The message might be duplicated during transport
- The consumer might be slow acknowledging the message
- The consumer might receive the message and then crash before acknowledging it
- The consumer acknowledges the message but this message is lost/delayed/arrives out of order
- The producer immediately after receiving the acknowledgement crashes

> **Note:** For our explanation it doesn't really matter whether the packet (message) actually leaves the machine or the destination (consumer) is on the same host. Of course, having a physical network in between the actors increases the chances of [messaging failures](https://queue.acm.org/detail.cfm?id=2655736). The network protocol in use was intentionally left unspecified. 

One of the following message delivery semantics is typically used to describe the messaging characteristics of a particular distributed system, such as the vCenter Event Broker Appliance:

- At most once semantics: a message will be delivered once or not at all to the consumer
- At least once semantics: a message will be delivered once or multiple times to the consumer
- Exactly once semantics: a message will be delivered exactly once to the consumer

> **Note:** Exactly once semantics is not supported by all messaging systems as it requires significant engineering effort to implement. It is considered the holy grail in messaging while at the same time being a highly [debated](https://medium.com/@jaykreps/exactly-once-support-in-apache-kafka-55e1fdd0a35f) topic.

As of today the vCenter Event Broker Appliance guarantees at most once delivery. While this might sound like a huge limitation in the appliance (and it might be, depending on your use case) in practice the chances for message delivery failures are/can be reduced by:

- Using TCP/IP as the underlying communication protocol which provides certain ordering (sequencing), back-pressure and retry capabilities at the transmission layer (default in the appliance)
- Using asynchronous function [invocation](#invocation) (defaults to "off", i.e. "synchronus", in the appliance) which internally uses a message queue for event processing
- Following [best practices](#code-best-practices) for writing functions

> **Note:** The vCenter Event Broker Appliance currently does not persist (to disk) or retry event delivery in case of failure during function invocation or upstream (external system, such as Slack) communication issues. For introspection and debugging purposes invocations are logged to standard output by the OpenFaaS vcenter-connector ("sync" invocation mode) or OpenFaaS queue-worker ("async" invocation mode).

We are currently investigating options to support at least once delivery semantics. However, this requires significant changes to the OpenFaaS vcenter-connector, such as:

- Tracking and checkpointing (to disk) successfully processed vCenter events (stream history position)
- Buffering events in the connector (incl. queue management to protect from overflows)
- Raising awareness (docs, tutorials) for function authors to deal with duplicated, delayed or out of order arriving event messages
- High-availability deployments (active-active/active-passive) to continue to retrieve the event stream during appliance downtime (maintenance, crash)
- Describe mitigation strategies for data loss in the appliance (snapshots, backups)

## The Event Specification

> **Note:** WIP, this new event spec will be a feature in an upcoming release of the appliance

The event payload structure used by the vCenter Event Broker Appliance has been significantly enriched since the beginning. It mostly follows the [CloudEvents](https://github.com/cloudevents/sdk-go/blob/master/pkg/cloudevents/eventcontext_v1.go) specification (v1), deviating only in some small cases (type definitions). The current data content type which is sent as payload when invoking a function is JSON.

The following example shows the event structure (trimmed for better readability):

```json
{
    "id": "6da664a7-7ad1-4b7a-b97f-8f7c75eae75a",
    "source": "10.0.10.1",
    "specversion": "1.0",
    "type": "com.github.openfaas-incubator.openfaas-vcenter-connector.vm.powered.on",
    "subject": "VmPoweredOnEvent",
    "time": "2019-12-08T10:57:35.596934Z",
    "data": {
        "Key": 9420,
        "CreatedTime": "2019-12-08T10:57:27.915136Z",
        [...]
    },
    "datacontenttype": "application/json"
}
```

> **Note:** This is not the event as emitted by vCenter. The appliance, using the OpenFaaS vcenter-connector, wraps the corresponding vCenter event (as seen in "data") into its own event structure.

`id:` The unique ID ([UUID](https://tools.ietf.org/html/rfc4122)) of the event

`source:` The vCenter emitting the embedded vSphere event (FQDN resolved when available)

`specversion:` The event specification the appliances uses (can be used for schema handling)

`type:` The canonical name of the event in "." dot notation (including the emitter, i.e. OpenFaaS vcenter-connector) 

`subject:` The vCenter event name (CamelCase)

`time:` Timestamp when this event was produced by the appliance

`data:` Original vCenter event

`data.Key:` Monotonically increasing value set by vCenter (the lower the key, the older the message as being created by vCenter)

`data.CreatedTime:` When the embedded event was created by vCenter

`datacontenttype:` Encoding used (JSON)

Please see the section on function [best practices](#code-best-practices) below how you can make use of these fields for advanced requirements.

## Invocation

Functions in OpenFaaS can be invoked synchronously or asynchronously:

`synchronous:` The function is called and the caller, e.g. OpenFaaS vcenter-connector, waits until the function returns (successful/error) or the timeout threshold is hit.

`asynchronous:` The function is not directly called. Instead, HTTP status code 202 ("accepted") is returned and the request, including the event payload, is stored in a [NATS Streaming](https://docs.nats.io/nats-streaming-concepts/intro) queue. One or more "queue-workers" process the queue items.

If you directly invoke your functions deployed in the appliance you can decide which invocation mode is used (per function). More details can be found [here](https://github.com/openfaas/workshop/blob/master/lab7.md).

The vCenter Event Broker appliance by default uses synchronous invocation mode. If you experience performance issues due to long-running/slow/blocking functions, consider running the VMware Event Router in asynchronous mode by setting the `"async"` option to `"true"` (quotes required) in the configuration file for the VMware Event Router deployment:

```json
{
    "type": "processor",
    "provider": "openfaas",
    "address": "http://127.0.0.1:8080",
    "auth": {
          ...skipped
        }
    },
    "options": {
        "async": "true"
    }
}
```

When the AWS EventBridge [event processor](#components) is used, events are only forwarded for the patterns configured in the AWS event rule ARN. For example, if the rule is configured with this event pattern:

```json
{
  "detail": {
    "subject": [
      "VmPoweredOnEvent",
      "VmPoweredOffEvent",
      "VmReconfiguredEvent"
    ]
  }
}
```

Only these three vCenter event types would be forwarded. Other events are discarded to save network bandwidth and costs.
