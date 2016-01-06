'use strict';

let TelegramCommand = require('../modules/telegram-command');


class CreateAccount extends TelegramCommand
{
  constructor()
  {
    super('/\/create_account/');
  }

  callback()
  {



    
  }
}


module.exports = CreateAccount;