'use strict'
const Command = require('../commands/command.js')
const args = process.argv
const command = new Command()
command.handleCommand(args)
