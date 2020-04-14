---
layout: docs
title: VMware Event Broker Appliance - Architecture
description: vCenter Event Broker Appliance Architecture
permalink: /kb/architecture
---

# Components

The vCenter Event Broker Appliance follows a highly modular approach, using Kubernetes and containers as an abstraction layer between the base operating system ([Photon OS](https://github.com/vmware/photon)) and the required application services. Currently the following components are used in the appliance:

- VMware Event Router ([Github](https://github.com/vmware-samples/vcenter-event-broker-appliance/tree/master/vmware-event-router))
  - Supported Event Stream Sources:
    - VMware vCenter ([Website](https://www.vmware.com/products/vcenter-server.html))
  - Supported Event Stream Processors: 
    - OpenFaaS ([Website](https://www.openfaas.com/))
    - AWS EventBridge ([Website](https://aws.amazon.com/eventbridge/))
- Contour ([Github](https://github.com/projectcontour/contour))
- Kubernetes ([Github](https://github.com/kubernetes/kubernetes))
- Photon OS ([Github](https://github.com/vmware/photon))


**VMware Event Router** implements the core functionality of the vCenter Event Broker Appliance, that is connecting to event `streams` ("sources") and processing the events with a configurable event `processor` such as OpenFaaS or AWS EventBridge.

**OpenFaaS&reg;** makes it easy for developers to deploy event-driven functions and microservices to Kubernetes without repetitive, boiler-plate coding. Package your code or an existing binary in a Docker image to get a highly scalable endpoint with auto-scaling and metrics. In the vCenter Event Broker Appliance OpenFaaS powers the appliance-integrated Function-as-a-Service framework to **trigger (custom) functions based on vSphere events**. The OpenFaaS user interface provides an easy to use dashboard to deploy and monitor functions. Functions can be authored and also deployed via an easy to use [CLI](https://github.com/openfaas/faas-cli).

**Amazon EventBridge** is a serverless event bus that makes it easy to connect applications together using data from your own applications, integrated Software-as-a-Service (SaaS) applications, and AWS services. The vCenter Event Broker Appliance offers native integration for **event forwarding to AWS EventBridge**. The only requirement is creating a dedicated IAM user (access_key) and associated EventBridge rule on the default (or custom) event bus in the AWS management console to be used by this appliance. Only events matching the specified event pattern (EventBridge rule) will be forwarded to limit outgoing network traffic and costs.

**Contour** is an Ingress controller for Kubernetes that works by deploying the Envoy proxy as a reverse proxy and load balancer. Contour supports dynamic configuration updates out of the box while maintaining a lightweight profile. In the vCenter Event Broker Appliance Contour provides **TLS termination for the various HTTP(S) endpoints** served.

**Kubernetes** is an open source system for managing containerized applications across multiple hosts. It provides basic mechanisms for deployment, maintenance, and scaling of applications. For application and appliance developers Kubernetes provides **powerful platform capabilities**, such as application (container) self-healing, secrets and configuration management, resource management, extensibility, etc. Kubernetes lays the foundation for future improvements of the vCenter Event Broker Appliance with regards to **high availability (n+1) and scalability (horizontal scale out)**.

**Photon OS&trade;** is an open source Linux container host optimized for cloud-native applications, cloud platforms, and VMware infrastructure. Photon OS provides a **secure run-time environment for efficiently running containers** and out of the box support for Kubernetes. Photon OS is the foundation for many appliances built for the vSphere platform and its ecosystem and thus the first choice for building the vCenter Event Broker Appliance.

# Architecture

<img src="./img/veba-appliance-diagram.png" height="250" align="right" />

Even though the vCenter Event Broker Appliance is instantiated as a single running virtual machine, internally its components follow a [microservices architecture](#components) running on Kubernetes. The individual services communicate via TCP/IP network sockets. Most of the communication is performed internally in the appliance so the chance of losing network packets is reduced. 

However, in case of a component being unavailable (crash-loop, overloaded and slow to respond) communication might be impacted and so it's important to understand the consequences for event delivery, i.e. function invocation. To avoid the risk of blocking remote calls, which could render the whole system unusable, sensible default timeouts are applied which can be fine-tuned if needed.

Kubernetes is a great platform and foundation for building highly available distributed systems. Even though we currently don't make use of its multi-node clustering capabilities (i.e. scale out), Kubernetes provides a lot of benefits to developers and users. Its self-healing capabilities continuously watch the critical vCenter Event Broker Appliance components and user-deployed functions and trigger restarts when necessary.

Kubernetes and its dependencies, such as the Docker, are deployed as systemd units. This addresses the "who watches the watcher" problem in case the Kubernetes node agent (kubelet) or Docker container runtime crashes.

> **Note:** We are considering to use Kubernetes' cluster capabilities in the future to provide increased resiliency (node crashes), scalability (scale out individual components to handle higher load) and durability (replication and persistency). The downside is the added complexity of deploying and managing a multi-node vCenter Event Broker Appliance environment.