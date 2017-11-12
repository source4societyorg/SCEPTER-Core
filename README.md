# SCEPTER-core

This is the core SCEPTER application and base for starting your projects using the SCEPTER framework

To setup, clone this repository onto your machine and run `yarn install`.

Under construction

## Credentials

Add credentials.json to your config file. Here is an example setup for AWS:

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

This file will be ignored by git

## Commands

    node ./bin/scepter.js list:all

This command will list all of the installed commands and print out their description/usage instructions

    node ./bin/scepter.js configure:cloud [<environment>]

This command will set the serverless application to use your development credentials

    node ./bin/scepter.js assets:initialize

This command will clone the SCEPTER fork of the [react-boilerplate/react-boilerplate](https://github.com/react-boilerplate/react-boilerplate) template and save it in your assets folder, then pull down and build dependencies. Useful with the `assets:deploy` command

    node ./bin/scepter.js assets:deploy [<bucket>] [<environment>]

This command will build the assets folder and then deploy the build to the target CDN bucket for your provider. For AWS, this requires an S3 bucket configured to serve static websites. 

    node ./bin/scepter.js service:create <service name> [<template>]

This command will automatically generate a new repository with the specified serverless template in the services folder

    node ./bin/scepter.js service:add <service repository>

Not yet implemented. Will retrieve a service from the service registry and add it to the services folder.
