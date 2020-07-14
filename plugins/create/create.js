fs = require('fs');
path = require('path');
module.exports = {
  name: 'Create',
  description: 'Create commands from chat',
  chat: true, // Defines this as a Chat Command
  event: false, // Is this a Event?
  type: 5004, // Type Event
  command: 'create', // This is the Command that is typed into Chat!
  permissions: [], // This is for Permissisons depending on the Platform.
  alias: [], // Alias commands that preform interesting things.
  cooldown: 1, // this is Set in Seconds, how long between the next usage of this command.
  settings: false, // Defining this as false will load the Settings file for this Plugin when the system loads this plugin.
  credits: 'Created by Raccoon, Update by Rehkloos',
  execute(client, data, args) {

            args = args.join(' ');
            new_command = args.substr(0,args.indexOf(' '));
            command_output = args.substring(args.indexOf(' ')+1);
            escaped_command_output = command_output.replace(/[\\$'"]/g, "\\$&");
            file_name = new_command + '.js';
            path_to_file = path.join(path.join(__dirname, '../plugins'), file_name);


    try {
      if (!fs.existsSync(path_to_file)) {
        data = `\
console.log('loaded ${new_command}'); \r\
module.exports = { \r\
    name: '${new_command}', \r\
    description: '', \r\
    permissions: [], \r\
    execute(client, data) { \r\
        client.sendMessage('${escaped_command_output}'); \r\
    }, \r\
}; \
`
        command_to_add = {
          name: new_command,
          description: '',
          permissions: [],
          execute(client, data) {
            client.sendMessage(command_output);
          },
        };
        fs.writeFile(path_to_file, data, function(err) {
          if (err) throw Error(err);
        });

        bot.commands.set(command_to_add.name, command_to_add);
        client.sendMessage(`Command ${new_command} added.`);

      }
    } catch (err) {
      console.log(err);
      client.sendMessage(`Command ${new_command} not added.`);
    }
  },
};
