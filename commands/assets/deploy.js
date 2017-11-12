'use strict'
const fs = require('fs')
const AWS = require('aws-sdk')
const mime = require('mime-types')

const assetDeployCommand = {
  command: 'assets:deploy',
  usage: 'assets:deploy <bucket> [<env>]',
  description: 'Deploys assets to the environments CDN',
  callback: function (args, credentials, command) {
    const env = args[4] || 'dev'
    const bucket = args[3] || credentials.environments[env].bucket
    this.commandObject = command
    this.credentials = credentials
    this.bucket = bucket
    this.env = env
    if (typeof bucket === 'undefined') {
      command.printMessage('Usage: node bin/scepter assets:deploy [<bucket>] [<env>]')
    } else {
      command.printMessage('Deploy would take place to ' + credentials.environments[env].provider + ' provider')
      assetDeployCommand.executeBuildCommand(command)
    }
  },
  executeBuildCommand: function (command) {
   command.executeCommand(
     'cd assets; yarn build; cd ../',
     'User interface build successful',
     'Failed to build user interface',
     assetDeployCommand.executeDeployCommand
   )
  },
  executeDeployCommand: function (command) {
    if(assetDeployCommand.credentials.environments[assetDeployCommand.env].provider === 'aws') {
        assetDeployCommand.executeAwsDeployCommand(command)
    }
  },
  executeAwsDeployCommand: function (command) {
    const files = fs.readdirSync('./assets/build');
    const s3 = new AWS.S3()
    assetDeployCommand.commandObject.printMessage('Uploading ' + files.length + ' objects.')
    for(var index = 0; index < files.length; index++) {
        (function (file) {
            const mimeType = mime.lookup('./assets/build/' + file)
            assetDeployCommand.commandObject.printMessage('Uploaded ' + file)                
            fs.readFile('./assets/build/' + file, function (err, data) {
                var params = {
                  Body: data, 
                  Bucket: assetDeployCommand.bucket,                   
                  ContentType: mimeType,
                  Key: file,              
                  ACL: 'public-read',
                  Tagging: "env=" + assetDeployCommand.env
                }; 
               
                s3.putObject(params, assetDeployCommand.uploadCallback)
            })
        })(files[index])
    }
  },
  uploadCallback: function (err, data) {
    if (err) {
	    assetDeployCommand.commandObject.printMessage(err)
        assetDeployCommand.commandObject.printMessage(err.stack)
	} else {
	    assetDeployCommand.commandObject.printMessage(data)
	}
  }
}

module.exports = assetDeployCommand
