'use strict';


var TelegramBot = require('node-telegram-bot-api');
/*
var token = '125446002:AAEm5VEUcuKHN5-Re8aksRPbbfoGeW0tVPk';
// Setup polling way
var bot = new TelegramBot(token, {polling: true});
var availableCommands = ['create_account','delete_account', 'my_account', 'update_account'];

// Any kind of message
bot.on('message', function (msg) {
  var chatId = msg.chat.id;
  // photo can be: a file path, a stream or a Telegram file_id
  bot.sendMessage(chatId, 'no operativo');
});

availableCommands.forEach(c =>{
  var p = new RegExp('\/' + c );
  bot.onText(p, function(msg, match){
    var fromId = msg.from.id;
    var resp = match[1];
    bot.sendMessage(fromId, "Command " + c);
  });
});

//bot.sendMessage(-1705596, "No estoy operativo aun... ");
*/



class TelegramMiddleware
{
  constructor()
  {
    this.bot = {};
  }

}

exports.create = function(){
  return new TelegramMiddleware();
}