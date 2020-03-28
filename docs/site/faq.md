---
layout: page
id: faq
title: Frequently Asked Questions
description: Update this
permalink: /faq
---

Q: Can the default TLS certificates that are being used on the Appliance be updated?<br/>
A: Yes! Follow the steps provided [here](/kb/advanced-certificates)

Q: Can I setup the VMware Event Broker Appliance components on Kubernetes?<br/>
A: Yes! Follow the steps provided [here](/kb/advanced-deploy-k8s)

Q: Can I connect to more than one vCenter per Appliance deployment?<br/>
A: No. The Appliance is currently designed to support one vCenter as the event source. Customers that are familiar with deploying the components on Kubernets can deploy multiple instances of the VMware Event Router container. 

Q: What happens if vCenter and VMware Event Broker connectivity is lost?<br/>
A: VMware Event router streams vCenter Events as they get generated and being stateless, does not persist any event information. Events that occur during this connectivity loss are not seen by the VMware event router and is currently not designed to go back in time to replay past messages. 

Q: How long does it take for the functions to be invoked upon an event being generated?<br/>
A: Instantaneous to a few seconds! The function execution itself is not considered in this answer since that is dependent on the logic that is being implemented.

Q: How do i get the Events in the function?<br/>
A: Events are made available as stdin argument for the language that you are writing the function on. 

Q: How do i get the config file that in the function?<br/>
A: Configs are made avaialble under /var/etc/config/<configname> within your container. 

Q: How do i get support for VMware Event Broker Appliance?<br/>
A: Vmware Event Broker Appliance is a Fling. While it is not supported by GSS, if you find an issue, you can always open a bug on the Flings website or create an issue on our Github. Our team is very responsive and will offer assistance based on impact and availability. 

