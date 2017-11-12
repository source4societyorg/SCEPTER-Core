'use strict'
const { exec } = require('child_process')
const initializeCommand = {  
  command: 'assets:initialize',
  usage: 'assets:initialize',
  description: 'Initialize the scepter fork of the react-boilerplate into the assets folder',
  callback: function (args, credentials, command) {
    this.executeCloneCommand(command)
  },
  executeCloneCommand: function (command) {
    command.executeCommand(
        'git clone git@github.com:source4societyorg/SCEPTER-assets.git assets',
        'Assets folder has been created successfully',
        'Failed to create the assets folder',
        initializeCommand.executeInstallCommand
    )
 },
 executeInstallCommand: function (command) {
   command.executeCommand(
        'cd assets; yarn install; cd ../',
        'Dependencies installed',
        'Failed to install dependencies'
   )
 }
}

module.exports = initializeCommand
