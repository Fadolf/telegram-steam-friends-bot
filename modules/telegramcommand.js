'use strict';

var telegram = require("./telegram-middleware").create();

class TelegramCommand
{
  constructor(c)
  {
    let input = c || {
      pattern: 'not valid',
      callback: function(){
        console.log('Command_callback: this command is not valid');
      }
    };

    this.pattern = input.pattern;
    this.callback = input.callback;
    this.tmw = telegram;
  }
};


module.exports = TelegramCommand;

