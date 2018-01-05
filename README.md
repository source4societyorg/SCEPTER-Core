# SCEPTER-core

[![scepter-logo](http://res.cloudinary.com/source-4-society/image/upload/v1514622047/scepter_hzpcqt.png)](https://github.com/source4societyorg/SCEPTER-core)

[![js-standard-style](https://cdn.rawgit.com/standard/standard/master/badge.svg)](http://standardjs.com)
[![Build Status](https://travis-ci.org/source4societyorg/SCEPTER-Core.svg?branch=master)](https://travis-ci.org/source4societyorg/SCEPTER-Core)
[![Serverless](http://public.serverless.com/badges/v1.svg)](http://serverless.com)

This is the core SCEPTER application and base for starting your projects using the SCEPTER framework

Contributors welcome! Email accounts@source4society.org for questions about how to contribute.

## Why SCEPTER?

SCEPTER is useful for organizing various micro-services and user interfaces within and across projects. The goal of the SCEPTER is to provide a framework for quickly setting up modern applications of any type based on a serverless architecture while promoting modularity and service reuse.

SCEPTER depends heavily on [Serverless.com](Serverless.com) for rapid cross-service setup and deployment, as well as production ready boilerplate code such as [react-boilerplate](https://github.com/react-boilerplate/react-boilerplate). SCEPTER commands are designed to simplify the coordinated deployment of these services and user interfaces as well as try to ease some of the difficulties of working with `git submodules`

## System Requirements

Currently this project has been tested primarily with /bin/bash for Ubuntu 16.04 and powershell for Windows 10. We would like to eventually support a wider number of systems and contributions to this effect are welcome.

`git` at least version 1.9 should be installed, as well as `yarn`.

See the [Serverless framework](https://serverless.com) provider specific limitations for which version of nodejs to install as different providers have different limitations. We recommend using [nvm](https://github.com/creationix/nvm) to switch between different versions of nodejs on your machine if you can.

It is also a good idea to familiarize yourself with [Git Submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules) as the framework relies heavily on them, although much effort has been made to simplify some of the submodule commands.

This project makes use of the [Serverless Framework](http://serverless.com)

## Setup

To setup, fork this repository and then clone onto your machine. We recommend using the --recursive flag. Alternatively you can clone the repository directly and then change the remote to point to your (empty) project repository. Here is an example:

  git clone --branch 1.0.2 git@github.com:source4societyorg/SCEPTER-Core --recursive

If you do not use the `--recursive` flag, be sure to run `git submodule update --init` to clone the submodule repositories. This will pull down the default commands. Once your project is setup, run `yarn install` to pull node dependencies and `yarn test` for good measure.

Start by creating a `credentials.json` in your `config` folder. 

If you are using powershell, add a `parameters.json` file to the config folder with the following setup:

    {
        "shell": "powershell"
    }

## Credentials

To get started, you will need to add `credentials.json` to your config folder. These should not be checked into your project repository as they contain sensitive information. You may need to review the [Serverless.com AWS Credentials Guide](https://serverless.com/framework/docs/providers/aws/guide/credentials/) to learn how to obtain these credentials. Here is an example setup for AWS:

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

Here is an example setup for Azure. You may need to review the [Serverless.com Azure Credentials Guide](https://serverless.com/framework/docs/providers/azure/guide/credentials/) to determine how to obtain these values.

    {
        "environments": {
            "dev": {
                "provider": "azure",
                "configuration": {
                    "subscriptionId": "aaaaa-aaaa-1111-11b1-111111111111",
                    "appId": "aaaaa-aaaa-1111-11b1-111111111111",
                    "displayName": "azure-cli-2099-12-01",
                    "tenantId": "aaaaa-aaaa-1111-11b1-111111111111",
                    "clientId": "http://azure-cli-2099-12-31-12",
                    "password": "aaaaa-aaaa-1111-11b1-111111111111"
                }
            }
        }
    }

This file will be ignored by git as specified in .gitignore to prevent committing sensitive information to your repository.

Once you have setup your environments, be sure to use the `node bin/scepter.js cloud:configure` command to set your credentials to point to the `dev` environment by default. 

## Commands

Use the following commands to get started with your project. These commands are pulled into your project by default as part of the SCEPTER framework, and custom command plugins can be created as well:

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

