'use strict';


var TelegramBot = require('node-telegram-bot-api');
var config = require('../config/config.js');

let instance = null;


class TelegramMiddleware
{
  constructor()
  {
    this.bot = new TelegramBot(config.telegramToken, {polling: true});

    if(!instance)
      instance = this;
    
    return instance;
  }

  sendMessageCallback(to, response)
  {
    this.bot.sendMessage(to, response);
  }

  registerCommand(command)
  {
    this.bot.on(command.pattern, command.callback);
  }

}

exports.create = function(){
  return new TelegramMiddleware();
}