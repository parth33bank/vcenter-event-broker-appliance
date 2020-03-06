# Dependencies for MacOS

Install the following for an easy to use dev environment:

* `brew install rbenv`
* `rbenv install 2.6.3`
* `gem install bundler`

# Dependencies for Linux
If you are running a build on Ubuntu you will need the following packages:
* ruby
* ruby-dev
* ruby-bundler
* build-essential
* zlib1g-dev
* nginx (or apache2)


# Local Development
* Install Jekyll and plug-ins in one fell swoop. `gem install github-pages`
This mirrors the plug-ins used by GitHub Pages on your local machine including Jekyll, Sass, etc.
* Clone down your own fork, or clone the main repo `git clone https://github.com/vmware-samples/vcenter-event-broker-appliance` and add your own remote.

```console
    cd vcenter-event-broker-appliance
    git checkout gh-pages
    bundle install
```

* Serve the site and watch for markup/sass changes `jekyll serve --livereload --incremental`. You may need to run `bundle exec jekyll serve --livereload --incremental`.
* View your website at http://127.0.0.1:4000/
* Commit any changes and push everything to your fork.
* Once you're ready, submit a PR of your changes. Netlify will automatically generate a preview of your changes.

# Troubleshooting
* If you don't see your updates reflected on the website when running locally, try the following steps

```console
    bundle exec jekyll clean
    bundle exec jekyll serve --incremental --livereload
```
