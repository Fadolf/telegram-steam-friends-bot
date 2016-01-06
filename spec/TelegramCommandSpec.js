'use strict';
require('jasmine-expect');

var Command = require('../modules/telegramcommand.js');

describe('TelegramCommand', function(){

  let parameter = {
      pattern: 'blabla',
      callback: function(msg, match){
        return 2;
      }
  };

  let c = new Command(parameter);
  

  it('should create an instance of TelegramCommand when imported', function(){
    expect(c).not.toBeNull();
    expect(c).toBeDefined();
    expect(c.constructor.name).toEqual('TelegramCommand');
  });

  it('should define pattern and callback properties', function(){
    expect(c.pattern).toBeDefined();
    expect(c.pattern).toBeString();
    expect(c.callback).toBeDefined();
    expect(c.callback).toBeFunction();
  });

  it('should have a reference to TelegramMiddleware', function(){
    expect(c.tmw).toBeDefined();
    expect(c.tmw).not.toBeNull();
    expect(c.tmw.constructor.name).toEqual('TelegramMiddleware');
  });

});