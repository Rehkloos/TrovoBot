const https = require('https');

module.exports = {
  name: 'COVID-states',
  description: 'COVID statistics per state in USA',
  chat: true, // Defines this as a Chat Command
  event: false, // Is this a Event?
  type: 5004, // Type Event
  command: 'covid-states', // This is the Command that is typed into Chat!
  permissions: [], // This is for Permissisons depending on the Platform.
  alias: [], // Alias commands that preform interesting things.
  cooldown: 10, // this is Set in Seconds, how long between the next usage of this command.
  settings: false, // Defining this as false will load the Settings file for this Plugin when the system loads this plugin.
  credits: 'Created by Rehkloos',
  execute(client, data) {
    data.args = data.args.join(' ');
    const commandOutput = data.args.substring(data.args.indexOf(' ') - 5); // accept 5 characters before space
    const state = commandOutput.replace(/ /g, '%20'); // convert spaces to %20 for api to recognize
    const rstate = commandOutput.replace(/%20/g, ' ');

    if (!data.args[0]) {
      client.sendMessage(`Example Usage: = !covid <state>`);
    } else if (data.args[0]) {
      const userUrl = `https://disease.sh/v3/covid-19/states/${state}`;
      https
        .get(userUrl, (resp) => {
          let cid = '';

          // A chunk of data has been recieved.
          resp.on('data', (chunk) => {
            cid += chunk;
          });
          resp.on('end', () => {
            const obj = JSON.parse(cid);
            if (obj) {
              const covid = obj;
              const scases = covid.cases;
              const sdeaths = covid.deaths;
              const stodayC = covid.todayCases;
              const stodayD = covid.todayDeaths;
              const stests = covid.tests;
              const sactive = covid.active;

              client.sendMessage(
                `Current COVID-19 info in ${rstate}:\rConfirmed:  ${scases}\r Cases Today:  ${stodayC}\rDeaths:  ${sdeaths}\rDeaths Today:  ${stodayD}\rActive:  ${sactive}\rTests:  ${stests}`,
              );
            } else {
              const err = obj.errors[0];
              const errMsg = err.message;
              if (errMsg) {
                client.sendMessage(`We could not find the state ${rstate}`);
              }
            }
          });
        })
        .on('error', (err) => {
          console.log(`Error: ${err.message}`);
        });
    }
  },
};
