console.log('loaded command list'); module.exports = {     name: 'commands',     description: '',     allowedRoles: ['EVERYONE'],     execute(message, args, user, bot) {         bot.sendMessage('Here are Rehkloos commands so far: !socials, !yokai');     }, }; 