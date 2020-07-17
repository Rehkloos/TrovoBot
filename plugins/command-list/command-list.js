const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'Command List',
  description: 'List all commands into chat',
  chat: true, // Defines this as a Chat Command
  event: false, // Is this a Event?
  type: 5004, // Type Event
  command: 'command-list', // This is the Command that is typed into Chat!
  permissions: [], // This is for Permissisons depending on the Platform.
  alias: [], // Alias commands that preform interesting things.
  cooldown: 1, // this is Set in Seconds, how long between the next usage of this command.
  settings: false, // Defining this as false will load the Settings file for this Plugin when the system loads this plugin.
  credits: 'Created by Rehkloos',
  execute(client) {
    const dir = path.join(__dirname, '..');

    try {
      const files = fs.readdirSync(dir);

      // files object contains all files names
      // log them on console

      let str = files;
      const array = str.toString().split(',');
      // TODO: Need spacing and a "," between each command in the array
      for (let i = 0; i < array.length; i++) {
        array[i] = `!${array[i]}`;
      }
      str = array.join('');

      // TODO: connect to plugin module so it only list files that are present
      client.sendMessage(str);
    } catch (err) {
      client.sendMessage('There is an error');
    }
  },
};
