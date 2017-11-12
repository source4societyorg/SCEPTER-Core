'use strict'

const createServiceCommand = {
  command: 'service:create',
  usage: 'service:create <service name> <[template]>',
  description: 'Creates a new service in the service directory and initializes a git repository',
  callback: function (args, credentials, command) {
    const serviceName = './services/' + args[3]
    const template = args[4] || 'aws-nodejs'   

    this.serviceName = serviceName
    this.template = template 

    if (serviceName.length < 1) {
      console.log('Usage: node bin/scepter service:create [template] <service path>')
      return
    }

    createServiceCommand.serverlessCommand(command)
  },
  serverlessCommand: function (command) {
    var execCommand = './node_modules/.bin/sls create'
    if (createServiceCommand.template.length > 0) {
      execCommand += ' --template ' + createServiceCommand.template
    }
    if (createServiceCommand.serviceName.length > 0) {
      execCommand += ' --path ' + createServiceCommand.serviceName
    }

    command.executeCommand(
       execCommand,
       'Successfully generated service configuration',
       'Failed to generate service configuration',
       createServiceCommand.gitCommand
    )
  },
  gitCommand: function (command) {
    const execCommand = 'cd ' + createServiceCommand.serviceName + '; git init'
    command.executeCommand(
       execCommand,
       'Initialized new service repository',
       'Failed to initialize service repository',
       createServiceCommand.simlinkCommand
    )
  },
  simlinkCommand: function (command) {
    const execCommand = 'cd ' + createServiceCommand.serviceName + '; mkdir config;ln -s ../../config/credentials.json ./credentials.json'
    command.executeCommand(
      execCommand,
      'Setup link to configuration',
      'Failed to setup link to configuration'
    )
  }
}

module.exports = createServiceCommand
