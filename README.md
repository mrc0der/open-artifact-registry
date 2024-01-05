# open-artifact-registry

Welcome to the `open-artifact-registry`!

This repo/tool/site aims to be a simple tool hosted via Github pages allowing me
to index and search all the open-source and DevOps goodies out there.

To be quite honest I was unable to get backstage.io working for my needs so we
are here `>_<`

## Requirements

### Running Locally

- `Docker`
- `docker-compose`

### Hosting

- Any HTML static site serving capable service
- Config the `repos.yaml`
- Upload `docs/*` to your host
- Visit and have fun sharing with others!

## Running

This app consists of a yaml repos list, a html file and a javascript app.js with
the logic. I have created a `Makefile` with a few targets `up` and `down`.

## TODO

- [ ] Move this to a prettier site with navigation.
- [ ] Share the site with the world!
