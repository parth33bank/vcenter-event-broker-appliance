---
layout: page
id: community
title: Community
description: Community Resources
permalink: /community
links:
- title: Twitter
  image: /assets/img/twitter.svg
  items:
  - description: "Follow us at: "
    url: "https://twitter.com/vEventBroker"
    label: "@vEventBroker"
- title: Slack
  image: /assets/img/slack.svg
  items: 
  - description: "Join us on: "
    url: "https://vmwarecode.slack.com/archives/CQLT9B5AA"
    label: Slack
---

# Join the movement

<div class="container pb-3">
  <div class="row">
    {% for link in page.links %}
    <div class="col community-item text-center shadow-sm m-2 p-2">
      <div class="icon">
        <a href="{{ link.url }}" target="_blank"><img src="{{ link.image | relative_url }}" alt="{{ link.title}}"></a>  
      </div>
      <h2 class="mt-2">{{link.title}}</h2>
      {% for item in link.items %}
      <div class="link-description">
        <p>{{ item.description }} <a href="{{ item.url }}" target="_blank">{{ item.label }}</a></p>
        <p>{{ item.notes }}</p>
      </div>
      {% endfor %}
    </div>
    {% endfor %}
  </div>
</div>

# Contributing

The vCenter Event Broker Appliance team welcomes contributions from the community.

Before you start working with the vCenter Event Broker Appliance, please read our [Developer Certificate of Origin](https://cla.vmware.com/dco){:target="_blank"}. All contributions to this repository must be signed as described on that page. Your signature certifies that you wrote the patch or have the right to pass it on as an open-source patch.

This page presents guidelines for contributing to vCenter Event Broker Appliance. The Following the guidelines helps to make the contribution process easy, collaborative, and productive.

## Submitting Bug Reports and Feature Requests

Please submit bug reports and feature requests by using our GitHub [Issues](https://github.com/vmware-samples/vcenter-event-broker-appliance/issues){:target="_blank"} page.

Before you submit a bug report about the code in the repository, please check the Issues page to see whether someone has already reported the problem. In the bug report, be as specific as possible about the error and the conditions under which it occurred. On what version and build did it occur? What are the steps to reproduce the bug?

Feature requests should fall within the scope of the project.

## Pull Requests

Before submitting a pull request, please make sure that your change satisfies the following requirements:
- vCenter Event Broker Appliance can be built and deployed. See the getting started build guide [here](getting-started-build.md).
- The change is signed as described by the [Developer Certificate of Origin](https://cla.vmware.com/dco){:target="_blank"} doc.
- The change is clearly documented and follows Git commit [best practices](https://chris.beams.io/posts/git-commit/){:target="_blank"}
- Contributions to the [examples](https://github.com/vmware-samples/vcenter-event-broker-appliance/tree/master/examples){:target="_blank"} contains a titled readme and the title is listed in the [use cases table](https://github.com/vmware-samples/vcenter-event-broker-appliance/blob/master/examples/README.md){:target="_blank"}.
