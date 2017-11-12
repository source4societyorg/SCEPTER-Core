'use strict'
module.exports = {
  command: 'service:deploy',
  usage: 'service:deploy [<env>]',
  description: 'This will deploy all of the services to the configured cloud provider',
  callback: function (args) {
    console.log('Not implemented yet...')
    // To do - build registry of services that can be added with this command
  }
}
