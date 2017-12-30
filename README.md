# SCEPTER-core

[![scepter-logo](http://res.cloudinary.com/source-4-society/image/upload/v1514622047/scepter_hzpcqt.png)](https://github.com/source4societyorg/SCEPTER-core)

[![js-standard-style](https://cdn.rawgit.com/standard/standard/master/badge.svg)](http://standardjs.com)
[![Build Status](https://travis-ci.org/source4societyorg/SCEPTER-Core.svg?branch=master)](https://travis-ci.org/source4societyorg/SCEPTER-Core)
[![Serverless](http://public.serverless.com/badges/v1.svg)](http://serverless.com)

This is the core SCEPTER application and base for starting your projects using the SCEPTER framework

To setup, fork this repository and then clone onto your machine, then run `yarn install`. We recommend using the --recursive flag. Alternatively you can clone the repository directly and then change the remote to point to your (empty) project repository. Here is an example:

  git clone git@github.com:source4societyorg/SCEPTER-Core --recursive

If you do not use the `--recursive` flag, be sure to run `git submodule update --init` to clone the submodule repositories.

Contributors welcome! Email accounts@source4society.org for questions about how to contribute.

## System Requirements

Currently this project is being developed on Ubuntu 16.04. We would like to eventually support a wider number of systems and contributions to this effect are welcome.

Due to limitations at the cloud providers, we are limited to `nodejs v6.10`. We reccommend using [nvm](https://github.com/creationix/nvm) to switch between different versions of nodejs on your machine.

We also rely on [yarn](https://yarnpkg.com/en/) currently, but will plan on dropping down to pure npm and possibly support other package managers in the future.

It is also a good idea to familiarize yourself with [Git Submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules) as the framework relies heavily on them, although much effort has been made to simplify some of the submodule commands.

This project makes use of the [Serverless Framework](http://serverless.com)

## Credentials

To get started, you will need to add credentials.json to your config folder. These should not be checked into your project repository as they contain sensitive information. Here is an example setup for AWS:

    {
        "environments": {
            "dev": {
                "provider": "aws",
                "configuration": { 
                    "accessKeyId": "AKIAJGTEST",
                    "secretAccessKey": "VrPdLiTEST",
                    "region":"us-east-1",
                    "maxRetries":2
                }
            }
        }
    }

This file will be ignored by git as specified in .gitignore

## Commands

Use the following commands to get started with your project:

The command engine allows for the creation of custom plugins. 

    node ./bin/scepter.js list:all

See [SCEPTER-command-list](https://github.com/source4societyorg/SCEPTER-command-list) This command will list all of the installed commands and print out their description/usage instructions

    node ./bin/scepter.js configure:cloud [<environment>]

See  [SCEPTER-command-cloud](https://github.com/source4societyorg/SCEPTER-command-cloud) This command will set the serverless application to use your development credentials

    node ./bin/scepter.js ui:initializeWebUi

See  [SCEPTER-command-ui](https://github.com/source4societyorg/SCEPTER-command-ui) This command will clone the SCEPTER fork [SCEPTER-webui](https://github.com/source4societyorg/SCEPTER-webui) of the [react-boilerplate/react-boilerplate](https://github.com/react-boilerplate/react-boilerplate) template and save it in your ui folder, then pull down and build dependencies. Useful with the `ui:webDeployS3` command

    node ./bin/scepter.js service:create

See  [SCEPTER-command-service](https://github.com/source4societyorg/SCEPTER-command-service) This command will automatically generate a new repository with the specified serverless template in the services folder.

## Services

A few services already made that will likely be useful for your application:

  [SCEPTER-GatewayService](https://github.com/source4societyorg/SCEPTER-GatewayService) - Exposes a URL that can be used to invoke other services as an API

  [SCEPTER-AuthenticationService](https://github.com/source4societyorg/SCEPTER-AuthenticationService) - Provides a service for authenticating users.

