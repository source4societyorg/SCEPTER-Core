'use strict'
const fs = require('fs')
const path = require('path')
const optionalRequire = require('optional-require')(require)
const credentials = optionalRequire('../config/credentials.json') || {}
const { spawn } = require('child_process')
const readlineModule = require('readline');
const immutable = require('immutable')

class Command {
  constructor () {
    this.commands = []
    this.fileSystem = fs
    this.commandPath = __dirname
    this.events = require('events')
    this.eventEmitter = new this.events.EventEmitter()
    this.eventEmitter.emit('commands.initialize')
    this.parameters = optionalRequire('../config/parameters.json') || { shell: 'bash' }
    this.services = optionalRequire('../config/services.json') || {}
    this.configuration = immutable.fromJS(Object.assign(credentials, { parameters: this.parameters }, { services: this.services } ))
    this.inputs = {}   
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
        this.commands[commandIndex].callback(args, this.configuration, this)
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

  prepareToReceiveInput() {
    this.readline = readlineModule.createInterface({
      input: process.stdin,
      output: process.stdout
    }); 
  }

  readInput(key, question, callback) {
    this.readline.question(question, (answer) => {
      this.inputs[key] = answer
      callback(answer)
    })
  }

  closeInputStream() {
    this.readline.close()
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
    let child

    switch (this.parameters.shell) {
      case 'powershell':
        child = spawn('powershell.exe -Command ' + commandString, {stdio: 'inherit', shell: true})
        break
      case 'bash':
      default:
        child = spawn(commandString, {stdio: 'inherit', shell: true})
    }

    // child.stderr.on('data', (data) => self.printMessage(data))
    // child.stdout.on('data', (data) => self.printMessage(data))
    child.on('close', (code, signal) => {
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
