'use strict'
const { exec } = require('child_process')

module.exports = {
  command: 'list:all',
  usage: 'list:all',
  description: 'Lists all of the available commands',
  callback: function (args, credentials, command) {
    command.listCommands()
  }
}
