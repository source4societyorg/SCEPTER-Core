'use strict'
const { exec } = require('child_process')

module.exports = {
  command: 'cloud:configure',
  usage: 'cloud:configure [<env>]',
  description: 'Sets the default cloud service provider configuration to use',
  callback: function (args, credentials) {
    const environment = args[3] || 'dev'
    const provider = credentials.environments[environment].provider
    const configuration = credentials.environments[environment].configuration
    const process = exec('./node_modules/.bin/sls config credentials --provider ' + provider + ' --key ' + configuration.accessKeyId + ' --secret ' + configuration.secretAccessKey + ' -o')

    process.stderr.on('data', function (data) {
      console.log(data)
    })

    process.stdout.on('data', function (data) {
      console.log(data)
    })

    process.on('exit', function (code, signal) {
      if (code === 0) {
        console.log('Set deploy configuration to ' + provider + ' for the ' + environment + ' environment.')
      } else {
        console.log('Command exited with non-zero exit code')
      }
    })
  }
}
