'use strict'
const fs = require('fs')
const path = require('path')
const credentials = require('../config/credentials.json')
const { exec } = require('child_process')

class Command {
  constructor () {
    this.commands = []
    this.fileSystem = fs
    this.commandPath = __dirname
    this.events = require('events')
    this.eventEmitter = new this.events.EventEmitter()
    this.eventEmitter.emit('commands.initialize')
    this.loadCommands()
  }

  handleCommand (args) {
    var commandIndex = false
    if (args.length > 2) {
      for (var index = 0; index < this.commands.length; index++) {
        if (args[2] === this.commands[index].command) {
          commandIndex = index
          break
        }
      }

      if (commandIndex !== false) {
        this.commands[commandIndex].callback(args, credentials, this)
      } else {
        console.log('Command not found: ' + args[2])
        console.log('List available commands: node bin/scepter list:all')
      }
    } else {
      console.log('Usage: node bin/scepter <command>:<action> [args]')
    }
  }

  listCommands () {
    if (this.commands.length < 1) {
      console.log('There are no commands attached')
    } else {
      console.log('SCEPTER Commands:')
      console.log('=============================')
      for (var index = 0; index < this.commands.length; index++) {
        console.log(this.commands[index].usage + ' - ' + (this.commands[index].description || 'no description provided') + '\n')
      }
      console.log('=============================')
    }
  }

  processError (data) {
    console.log(data)
  }

  loadCommands () {
    const directories = this.getDirectories(this.commandPath)
    for (var i = 0; i < directories.length; i++) {
      const files = fs.readdirSync(directories[i])
      for (var a = 0; a < files.length; a++) {
        var file = files[a]
        if (file.indexOf('.js') !== -1 && file.indexOf('.json') === -1) {
          var requirePath = directories[i] + '/' + file
          var command = require(requirePath)
          this.commands.push(command)
        }
      }
    }
  }

  isDirectory (source) {
    return fs.lstatSync(source).isDirectory()
  }

  getDirectories (source) {
    return this.fileSystem
      .readdirSync(source)
      .map(name => path.join(source, name))
      .filter(this.isDirectory)
  }

  executeCommand (commandString, successMessage, failureMessage, successCallback, failureCallback) {
    const self = this
    const process = exec(commandString)
    process.stderr.on('data', (data) => self.printMessage(data))
    process.stdout.on('data', (data) => self.printMessage(data))
    process.on('exit', (code, signal) => {
      if (code === 0) {
        self.printMessage(successMessage)
        if (typeof successCallback !== 'undefined') {
          successCallback(self)
        }
      } else {
        self.printMessage(failureMessage)
        if (typeof failureCallback !== 'undefined') {
          failureCallback(self)
        }
      }
    })
  }

  printMessage (message) {
    console.log(message)
  }
}

module.exports = Command
