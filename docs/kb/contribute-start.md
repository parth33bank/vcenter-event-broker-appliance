---
layout: docs
toc_id: contribute-start
title: vCenter Event Broker Appliance - Getting Started
description: Getting Started
permalink: /kb/contribute-start
---

# Contributing

The vCenter Event Broker Appliance team welcomes contributions from the community.

Before you start working with the vCenter Event Broker Appliance, please read our [Developer Certificate of Origin](https://cla.vmware.com/dco). All contributions to this repository must be signed as described on that page. Your signature certifies that you wrote the patch or have the right to pass it on as an open-source patch.

# Step-by-step help

If you're just starting out with containers and source control and are looking for additional guidance, browse to this [blog series](http://www.patrickkremer.com/veba/) on VEBA. The blog goes step-by-step with screenshots and assumes zero experience with any of the required tooling.

# Preqrequisites

Three tools are required in order to contribute functions - You must install [Git](https://git-scm.com/downloads), [Docker](https://docs.docker.com/),  and download [faas-cli.exe](https://github.com/openfaas/faas-cli/releases). 

You must also create a [Github](https://github.com/join) account. You need to verify your email with Github in order to contribute to the VEBA repository

# Quickstart for Contributing

## Download the VEBA source code
```bash
git clone https://github.com/vmware-samples/vcenter-event-broker-appliance
```

## Configure git to sign code with your verified name and email
```bash
git config --global user.name "Your Name"
git config --global user.email "youremail@domain.com"
```

## Contribute documentation changes

Make the necessary changes and save your files. 
```bash
git diff
```

This is sample output from git. It will show you files that have changed as well as all display all changes.
```bash
user@wrkst01 MINGW64 ~/Documents/git/vcenter-event-broker-appliance(master)
$ git diff
diff --git a/docs/kb/contribute-start.md b/docs/kb/contribute-start.md
index 4245046..f86f09f 100644
--- a/docs/kb/contribute-start.md
+++ b/docs/kb/contribute-start.md
@@ -6,6 +6,32 @@ description: Getting Started
 permalink: /kb/contribute-start
 ---

+# Preqrequisites
+
+Three tools are required in order to contribute functions - 
(output truncated)
```

Commit the code and push your commit. -a commits all changed files, -s signs your commit, and -m is a commit message - a short description of your change.


```bash
git commit -a -s -m "Added prereq and git diff output to contribution page."
git push
```

You can then submit a pull request (PR) to the VEBA maintainers - a step-by-step guide with screenshots is available [here](http://www.patrickkremer.com/2019/12/vcenter-event-broker-appliance-part-v-contributing-to-the-veba-project/)

# Changing or contributing new functions

The git commands are the same, but in order to change code, you must reference your own Docker image. The example YAML below comes from the [datastore-usage-email](https://github.com/vmware-samples/vcenter-event-broker-appliance/tree/development/examples/powercli/datastore-usage-email) sample function. Note that the `image:` references the `vmware` docker account. You must change this to your own docker account. As always the `gateway:` must point to your own local VEBA appliance


```yaml
provider:
  name: openfaas
  gateway: https://veba.primp-industries.com
functions:
  powershell-datastore-usage:
    lang: powercli
    handler: ./handler
    image: vmware/veba-powercli-datastore-notification:latest
    environment:
      write_debug: true
      read_debug: true
      function_debug: false
    secrets:
      - vc-datastore-config
    annotations:
      topic: AlarmStatusChangedEvent

```

Once you've written or changed function code, you can push it to your local VEBA appliance for testing. 
```bash
docker login
faas-cli build -f stack.yml
faas-cli push -f stack.yml
faas-cli deploy -f stack.yml --tls-no-verify
```
If everything works as expected, you can then commit your code and file a pull request for inclusion into the project.

## Submitting Bug Reports and Feature Requests

Please submit bug reports and feature requests by using our GitHub [Issues](https://github.com/vmware-samples/vcenter-event-broker-appliance/issues) page.

Before you submit a bug report about the code in the repository, please check the Issues page to see whether someone has already reported the problem. In the bug report, be as specific as possible about the error and the conditions under which it occurred. On what version and build did it occur? What are the steps to reproduce the bug?

Feature requests should fall within the scope of the project.

## Pull Requests

Before submitting a pull request, please make sure that your change satisfies the following requirements:
- vCenter Event Broker Appliance can be built and deployed. See the getting started build guide [here](getting-started-build.md).
- The change is signed as described by the [Developer Certificate of Origin](https://cla.vmware.com/dco) doc.
- The change is clearly documented and follows Git commit [best practices](https://chris.beams.io/posts/git-commit/)
- Contributions to the [examples](https://github.com/vmware-samples/vcenter-event-broker-appliance/tree/master/examples) contains a titled readme and the title is listed in the [use cases table](https://github.com/vmware-samples/vcenter-event-broker-appliance/blob/master/examples/README.md).