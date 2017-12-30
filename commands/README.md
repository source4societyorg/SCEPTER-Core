# Commands

SCEPTER command plugins should be added here as submodules.

# Plugins

You can create your own service plugins by adding a folder here containing js files that export an object with the following minimum structure:

  const yourCommand = {
    command: '<command namespace>:<command name>',
    usage: '<command namespace>:<command name> args...',
    description: 'Replace <command namespace> and <command name> with your own names',
    callback: callbackFunction
  }

  function callbackFunction (args, credentials, command) {
    //Initialize properties here
    command.executeCommand(
      anotherFunctionToExecute,
      'success message to be printed to console',
      'error message to be printed to console',
      nextFunction); //Leave this last argument off if you have no more commands to execute      
  }

It is recommended to add your command as a separate submodule in its own repository.
