---
layout: page
id: faq
title: Frequently Asked Questions
description: A compilation of frequently asked questions for VMware Event Broker Appliance
permalink: /faq
faqs:
- title: Common Questions - Appliance
  id: appliance
  items:
  - Q: "Can I connect to more than one vCenter per Appliance deployment?"
    A: "No. The Appliance is currently designed to support one vCenter as the event source. Customers that are familiar with deploying the components on Kubernetes can deploy multiple instances of the VMware Event Router container. "
  - Q: "Can the default TLS certificates that are being used on the Appliance be updated?"
    A: "Yes! Follow the steps provided [here](/kb/advanced-certificates)"
  - Q: What happens if vCenter and VMware Event Broker connectivity is lost?
    A: VMware Event router streams vCenter Events as they get generated and being stateless, does not persist any event information. Events that occur during this connectivity loss are not seen by the VMware event router and is currently not designed to go back in time to replay past messages. 
  - Q: How long does it take for the functions to be invoked upon an event being generated?
    A: Instantaneous to a few seconds! The function execution itself is not considered in this answer since that is dependent on the logic that is being implemented.
  - Q: Can I setup the VMware Event Broker Appliance components on Kubernetes?
    A: Yes! Follow the steps provided [here](/kb/advanced-deploy-k8s)
- title: Common Questions - Functions
  id: function
  items: 
  - Q: How do i obtain the Events in the function?
    A: > 
        Events are made available as stdin argument for the language that you are writing the function on. For example, <br/> 
        - In Powershell the event is made available using the `$args` variable as shown here `$json = $args | ConvertFrom-Json` <br/>
        - In Python the event is made available with the `req` variable as shown here `cevent = json.loads(req)`
  - Q: How do i obtain the config file within the function?
    A: Configs are made available under `/var/etc/config/<configname>` within your container which you can read as a file within your function.
  - Q: Can i reuse secrets that was created for another function?
    A: Yes, if there is a config that you'd like different functions to share, create the secret and ensure your functions `stack.yml` references this secret. 
- title: Other
  id: other
  items:
  - Q: How do i get support for VMware Event Broker Appliance?
    A: VMware Event Broker Appliance is a Fling. While it is not supported by GSS, if you find an issue, you can always open a bug on the Flings website or create an issue on our Github. Our team is very responsive and will offer assistance based on impact and availability. 
---

Find answers to the frequently asked questions about VMware Event Broker Appliance and Functions. 

 <div class="faqs section-content p-0 wd-100">
    {% for faq in page.faqs %}
    <h2>{{faq.title}}</h2>
    <div id="{{ faq.id }}" class="list-group mb-4 ">
    {% for item in faq.items %}
        <div class="list-group-item border border-0 ">
            <div class="row align-middle p-0 m-0 font-weight-bold">
                <i class="fas fa-question-circle text-secondary"></i>
                {{ item.Q | markdownify }}
            </div>
            <div class="row align-middle p-0 m-0">
                <i class="fas fa-info-circle text-info"></i>
                {{ item.A | markdownify }}
            </div>
        </div>
    {% endfor %}
    </div>
    {% endfor %}
</div>

## Have more questions? 
- Explore our [documentation](/kb)
- Feel free to reach out
  - Email us at [DL-VEBA@vmware.com](mailto:DL-VEBA@vmware.com)
  - Join us on slack [#vcenter-event-broker-appliance](https://vmwarecode.slack.com/archives/CQLT9B5AA) on vmwarecode.slack.com
  - Tweet at us [@vEventBroker](https://twitter.com/vEventBroker)
  - Explore our Github repository [here](https://github.com/vmware-samples/vcenter-event-broker-appliance)