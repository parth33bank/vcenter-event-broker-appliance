---
layout: page
id: functions
title: Prebuilt Functions
description: Community-sourced and validated prebuilt functions for OpenFaaS with VEBA
permalink: /examples
---

# Get started with our prebuilt functions

A complete and updated list of ready to use functions curated by the vCenter Event Broker community is listed below. These functions are prebuilt, available in ready to deploy container and `stack.yml` files for you to deploy as is. Should you need to modify the functions to fit your needs, the `README.md` files provided within each function folder will provide all the information you need to customize, build and deploy the function on your VMware Event Broker appliance. 

> **Note:** These functions are provided and tested to be used with the vCenter Event Broker Appliance deployed with [OpenFaaS](/kb/deploy-openfaas) as the event stream processor. 

| Use Cases | Python | PowerCLI | PowerShell | Go | 
| :--- | :---: | :---: | :---: | :---: |
| vSphere Tagging | [Link](https://github.com/vmware-samples/vcenter-event-broker-appliance/tree/master/examples/python/tagging) | [Link](https://github.com/vmware-samples/vcenter-event-broker-appliance/tree/master/examples/powercli/tagging) | | [Link](https://github.com/vmware-samples/vcenter-event-broker-appliance/tree/master/examples/go/tagging) |
| Send VM Configuration Changes to Slack | | [Link](https://github.com/vmware-samples/vcenter-event-broker-appliance/tree/master/examples/powercli/hwchange-slack) | | |
| Disable Alarms for Host Maintenance | | [Link](https://github.com/vmware-samples/vcenter-event-broker-appliance/tree/master/examples/powercli/hostmaint-alarms) | | |
| ESX Maximum transmission unit fixer | [Link](https://github.com/vmware-samples/vcenter-event-broker-appliance/tree/master/examples/python/esx-mtu-fixer) | | |
| Datastore Usage Notification | | [Link](https://github.com/vmware-samples/vcenter-event-broker-appliance/tree/master/examples/powercli/datastore-usage-email) | | |
| Echo VEBA Event | [Link](https://github.com/vmware-samples/vcenter-event-broker-appliance/tree/master/examples/python/echo)| | |
| vRealize Orchestrator | | | [Link](https://github.com/vmware-samples/vcenter-event-broker-appliance/tree/master/examples/powershell/vro) | |
| Create PagerDuty incident | [Link](https://github.com/vmware-samples/vcenter-event-broker-appliance/tree/master/examples/python/trigger-pagerduty-incident) | | | |
| POST to any REST API | [Link](https://github.com/vmware-samples/vcenter-event-broker-appliance/tree/master/examples/python/invoke-rest-api) | | | |


These functions serve as an easy way to use the appliance and as an inspiration for how to write functions in different languages. If you have an idea for a function and are looking to write your own, start with our documentation [here](/kb/contribute-functions). 

Check our [Contributing guidelines](\community) and Join team #VEBA by submitting a pull request for your function to be showcased on this list. 