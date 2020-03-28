---
layout: docs
title: vCenter Events Broker Appliance
description: Update this
permalink: /kb/use-functions
---

# Getting started with using Function

The steps below describe a generalized deployment step of a Function on VMware Event Broker Appliance configured with OpenFaaS as the Event Processor. For customers looking to get started quickly, please look at deploying from our growing list of [Prebuilt Functions](/examples). The functions are organized by the language that they are written on and have well documented README.md files that goes over the deployment steps. 

## Function deployment steps

For this walk-through, the `echo` function from the example folder is used. 

### Step 1 - Clone repo

```
git clone https://github.com/vmware-samples/vcenter-event-broker-appliance
cd vcenter-event-broker-appliance/examples/python/echo
git checkout master
```

### Step 2 - Edit the configuration files

* Edit `stack.yml` to update the topic with the specific vCenter Server Event(s) from [vCenter Event Mapping](https://github.com/lamw/vcenter-event-mapping) document
* Most other functions might have some sort of configs that are needed to be accessed within the functions securely. These configs are configured as secrets and should be edited as required

### Step 3 - Login to the OpenFaaS gateway on vCenter Event Broker Appliance

```
VEBA_GATEWAY=https://veba.primp-industries.com
export OPENFAAS_URL=${VEBA_GATEWAY}

faas-cli login --username admin --password-stdin --tls-no-verify
```

### Step 4 - Deploy function to vCenter Event Broker Appliance

```
faas-cli deploy -f stack.yml --tls-no-verify
```

### Step 5 - Test and Invoke your functions

* Your function is now deployed to OpenFaaS and available for VMware Event Router to invoke when it sees a matching event
* You can also test or invoke your functions using the http endpoint for the function that OpenFaaS makes available. Pass the expected CloudEvents to the function as the http request parameter

<br/>

Check our list of [Prebuilt Functions](/examples) to quickly get started.