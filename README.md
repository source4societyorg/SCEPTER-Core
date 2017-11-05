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
				"keys": {
					"awsKey": "AKIAJGEXAMPLEKEY",
					"secret": "VrPdLEXAMPLESECRET"
				}           
			}
		}
	}

This file will be ignored by git

## Commands

    node ./bin/scepter.js configure:cloud <environment>

This command will set the serverless application to use your development credentials

    node ./bin/scepter.js service:create [<template>] <service name>

This command will automatically generate a new repository with the specified serverless template in the services folder

    node ./bin/scepter.js service:add <service repository>

Not yet implemented. Will retrieve a service from the service registry and add it to the services folder.
