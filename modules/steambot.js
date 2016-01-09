"use strict";

let telegram = require('../modules/telegram-middleware').create();
let mongo = require('../modules/mongo-middleware').get();


let commands = 
[
  {
    pattern: /\/create_account( +[0-9]+)?/,
    callback: function(msg, match)
    {      
      var chatId = msg.from.id;
      var steamId = match[1].trim();
      if(steamId === undefined){
        telegram.sendMessage(chatId, 'Please, call this command followed by your Steam id');

      }
      else{
       telegram.sendMessage(chatId, 'Creating steam account for ID: ' + steamId);

       mongo.createAccount({
        telegramId: msg.from.id,
        telegramName: msg.from.username,
        steamId: steamId
       });
      }      
    }
  },
  {
    pattern: /\/update_account/,
    callback: function(msg, match)
    {
      var chatID = msg.from.id;
      telegram.sendMessage(chatID, 'Checking your account, please wait');
    }
  }
];

module.exports.init = function()
{
  commands.forEach(c => {
    telegram.registerCommand(c);
  });
};