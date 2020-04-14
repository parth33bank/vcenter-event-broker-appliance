---
layout: docs
title: vCenter Event Broker Appliance - Using Functions
description: vCenter Event Broker Appliance - Using Functions
permalink: /kb/use-functions
---

# Getting started with using functions

The steps below describe a generalized deployment step of a Function on VMware Event Broker Appliance configured with OpenFaaS as the Event Processor. For customers looking to get started quickly, please look at deploying from our growing list of [Prebuilt Functions](/examples). The functions are organized by the language that they are written on and have well documented README.md files that goes over the deployment steps. 

## Function deployment steps

For this walk-through, the `host-maint-alarms` function from the example folder is used. 

### Step 1 - Clone repo

```
git clone https://github.com/vmware-samples/vcenter-event-broker-appliance
cd vcenter-event-broker-appliance/examples/powercli/hostmaint-alarms
git checkout master
```

### Step 2 - Edit the configuration files

* Edit `stack.yml` to update `gateway:` with the specific appliance URL in your environment. Notice event(s) next to `topics:` - all available events can be reviewed in the [vCenter Event Mapping](https://github.com/lamw/vcenter-event-mapping) document.
```yaml
version: 1.0
provider:
  name: openfaas
  gateway: https://veba.primp-industries.com
functions:
  powercli-entermaint:
    lang: powercli
    handler: ./handler
    image: vmware/veba-powercli-esx-maintenance:latest
    environment:
      write_debug: true
      read_debug: true
      function_debug: false
    secrets:
      - vc-hostmaint-config
    annotations:
      topic: EnteredMaintenanceModeEvent, ExitMaintenanceModeEvent
```

* Most functions also have a secrets configuration file that you must edit to match your environment. For the `hostmaint-alarms` function, the file is named `vc-hostmaint-config.json`
```json
{
    "VC" : "https://veba.primp-industries.com",
    "VC_USERNAME" : "veba@vsphere.local",
    "VC_PASSWORD" : "FillMeIn"
}
```
Then create the secret in OpenFaaS with this command:
```bash
faas-cli secret create vc-hostmaint-config --from-file=vc-hostmaint-config.json --tls-no-verify
```

### Step 3 - Login to the OpenFaaS gateway on vCenter Event Broker Appliance

Use your appliance URL and OpenFaaS password instead of the example URL below
```bash
export OPENFAAS_URL='https://veba.primp-industries.com'
faas-cli login -p YourPassword --tls-no-verify
```
An alternative way to log in if you don't want your password showing up in command history is to put the password in a text file and use this command:
```bash
cat password.txt | faas-cli login --password-stdin --tls-no-verify
```

### Step 4 - Deploy function to vCenter Event Broker Appliance

```
faas-cli deploy -f stack.yml --tls-no-verify
```

### Step 5 - Test and Invoke your functions

* Your function is now deployed to OpenFaaS and available for VMware Event Router to invoke when it sees a matching event
* You can also test or invoke your functions using the http endpoint for the function that OpenFaaS makes available. Pass the expected CloudEvents to the function as the http request parameter
    
    
    
Check our list of [Prebuilt Functions](/examples) to quickly get started.