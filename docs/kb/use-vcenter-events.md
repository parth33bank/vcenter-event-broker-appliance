---
layout: docs
title: vCenter Events Broker Appliance
description: Update this
permalink: /kb/vcenter-events
---

# vCenter Events

vCenter produces a lot of useful events that get generated in response to a command on an entity such as VM, Host, Datastore etc. These events are immutable facts that document the state changes to the entity such as who initiated the change, what action was performed, which object was modified and when was the change initiated. 

Events naturally serve the purpose of auditing or troubleshooting that allows someone to review and get more details about a change. Event Driven Automation builds on the construct of events and enables advanced distributed design patterns driven through  Events. Vmware Event Broker Appliance aims to enable this for VMware SDDC by enabling VI Administrators to write lean functions (script or code) that are triggered by vCenter Events. 

## Overview of the vCenter events

vCenter Events are categorized by the Objects and the actions that are allowed on these objects and are documented under the vSphere API [reference](https://code.vmware.com/apis/704/vsphere/vim.event.Event.html){:target="_blank"}. 

* Event
  * ClusterEvent
    * ClusterCreatedEvent, ClusterDestroyedEvent, ClusterOvercommittedEvent...
  * DatastoreEvent
    * DatastoreCapacityIncreasedEvent, DatastoreDestroyedEvent, DatastoreDuplicatedEvent... 
  * DatacenterEvent
    * DatacenterCreatedEvent, DatacenterRenamedEvent
  * HostEvent
    * HostShutdownEvent, HostAddedEvent, EnteringMaintenanceModeEvent...
  * VMEvent
    * VmNoNetworkAccessEvent, VmOrphanedEvent, VmPoweredOffEvent...
  * ...

There are over 1650+ events available on an out of the box install of vCenter that are provided [here](https://github.com/pksrc/vcenter-event-mapping/blob/master/vsphere-6.7-update-3.md){:target="_blank"} and [here](https://www.virten.net/vmware/vcenter-events/){:target="_blank"}. You can get the complete list of events for your vCenter using the powershell script below. 

```powershell
$vcNames = "hostname"

Connect-VIServer -Server $vcNames

$vcenterVersion = ($global:DefaultVIServer.ExtensionData.Content.About.ApiVersion)

$eventMgr = Get-View $global:DefaultVIServer.ExtensionData.Content.EventManager

$results = @()
foreach ($event in $eventMgr.Description.EventInfo) {
    if($event.key -eq "EventEx" -or $event.key -eq "ExtendedEvent") {
        #echo $event
        $eventId = ($event.FullFormat.toString()) -replace "\|.*",""
        $eventType = $event.key
    } else {
        $eventId = $event.key
        $eventType = "Standard"
    }
    $eventCategory = $event.Category
    $eventDescription = $event.Description

    $tmp = [PSCustomObject] @{
        EventId = $eventId;
        EventCategory = $eventCategory
        EventType = $eventType;
        EventDescription = $($eventDescription.Replace("<","").Replace(">",""));
    }

    $results += $tmp
}

Write-Host "Number of Events: $($results.count)"
$results | Sort-Object -Property EventId | ConvertTo-Csv | Out-File -FilePath vcenter-$vcenterVersion-events.csv
```

<br/>
Once you have an event identified, proceed to deploying functions from our list of prebuilt functions or write you own functions. 