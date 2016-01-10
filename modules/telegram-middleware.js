'use strict';


var TelegramBot = require('node-telegram-bot-api');
var config = require('../config/config.js').config();

let instance = null;
let bot = new TelegramBot(config.telegramToken, {polling: true});

class TelegramMiddleware
{
  constructor()
  {    
    if(!instance)
      instance = this;
    
    if(this.bot === undefined || !this.bot)
      this.bot = bot;

    return instance;
  }

  sendMessage(to, response, options)
  {
    console.log("Sending message\n\n");
    console.log("To: " + to);
    if(!options || options === undefined)
      this.bot.sendMessage(to, response);
    else
      this.bot.sendMessage(to, response, options);
  }

  registerCommand(command)
  {
    console.log("Command registered!");
    this.bot.onText(command.pattern, command.callback);
  }

}

exports.create = function(){
  return new TelegramMiddleware();
}