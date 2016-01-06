'use strict';

var telegram = require("./telegram-middleware").create();

class TelegramCommand
{
  constructor(pattern)
  {
    this.pattern = pattern || 'not valid';
    this.tmw = telegram;
  }

  callback()
  {

  }
};


module.exports = TelegramCommand;

