# Readme for the Website

## Structure
```
.
├── site > Contains MD files that need to go under the base website
│   └── CONTRIBUTING.md
├── kb > Contains MD files for the documentation section of the website
│   └── **.md
├── assets > Contains JS, CSS, IMGs for the site
│   ├── js
│   ├── img
│   └── css
├── index.html > Website Landing page
├── README.md * You are here
├── _config.yml > Configurations for the website
└── Gemfile > Required file to load GEM Plugins
```

## Build and Run the website locally

### Dependencies for MacOS

Install the following for an easy to use dev environment:

```console
brew install rbenv
rbenv install 2.6.3
gem install bundler
```

### Dependencies for Linux
If you are running a build on Ubuntu you will need the following packages:
* ruby
* ruby-dev
* ruby-bundler
* build-essential
* zlib1g-dev
* nginx (or apache2)

### Dependencies for Windows
If you are on Windows, all hope is not lost. Follow the steps here to install the dependencies - https://jekyllrb.com/docs/installation/windows/

### Local Development
* Install Jekyll and plug-ins in one fell swoop. `gem install github-pages`
This mirrors the plug-ins used by GitHub Pages on your local machine including Jekyll, Sass, etc.
* Clone down your own fork, or clone the main repo `git clone git@github.com:vmware-samples/vcenter-event-broker-appliance.git` and add your own remote.

```console
    cd vcenter-event-broker-appliance/docs
    bundle install
```

* Serve the site and watch for markup/sass changes `jekyll serve --livereload --incremental`. You may need to run `bundle exec jekyll serve --livereload --incremental`.
* View your website at http://127.0.0.1:4000/
* Commit any changes and push everything to your fork.
* Once you're ready, submit a PR of your changes. 

## Troubleshooting
* If you don't see your updates reflected on the website when running locally, try the following steps

```console
    bundle exec jekyll clean
    bundle exec jekyll serve --incremental --livereload
```
