'use strict'

const { exec } = require('child_process')
const credentials = require('../config/credentials.json')
const args = process.argv

if (args.length > 2) {
  switch (args[2]) {
    case 'configure:cloud':
      configureCloud(args)
      break
    case 'service:create':
      createService(args)
      break
    case 'service:add':
      addService(args);
      break
    case 'service:deploy':
      console.log('not implemented')
      break
    default:
      console.log('Command not found: ' + args[2])
      break
  }
} else {
  console.log('Usage: node bin/scepter <command>:action')
}

function configureCloud (args) {
  const provider = credentials.environments[args[3]].provider
  const keys = credentials.environments[args[3]].keys

  const process = exec('./node_modules/.bin/sls config credentials --provider ' + provider + ' --key ' + keys.awsKey + ' --secret ' + keys.awsSecret)
  process.stderr.on('data', function (data) {
      console.log(data);
  });

  process.on('exit', function (code, signal) {
    if(code == 0) {
      console.log('Set deploy configuration to ' + provider + ' for the ' + args[3] + ' environment.')
    }
  })
}

function createService (args) {
  const template = args[3];
  const serviceName = './services/' + args[4];
  var execCommand = './node_modules/.bin/sls create';

  if (template.length > 0) {
    execCommand += ' --template ' + template;
  }

  if (serviceName.length < 1) {
    console.log('Usage: node bin/scepter service:create [template] <service path>');
  } else {
    execCommand += ' --path ' + serviceName;
  }
  
  const process = exec(execCommand);
  process.stderr.on('data', function (data) {
      console.log(data);
  });
  process.on('exit', function (code, signal) {
    if(code == 0) {
      console.log('Created service ' + serviceName);
    }
  });
}

function addService (args) {
    console.log('Not implemented yet...');
    //To do - build registry of services that can be added with this command
}

