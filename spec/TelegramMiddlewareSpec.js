'use strict';
require('jasmine-expect');

var TelegramMiddleware = require('../modules/telegram-middleware');


describe('TelegramMiddleware', function() {
  
  let tmw = TelegramMiddleware.create();

  it('should create an instance of TelegramMiddleware when imported', function(){
    expect(tmw).not.toBeNull();
    expect(tmw).toBeDefined();
    expect(tmw.constructor.name).toEqual('TelegramMiddleware');
  });

  it('should have a bot property', function(){
    expect(tmw.bot).not.toBeNull();
    expect(tmw.bot).toBeDefined();
    expect(typeof(tmw.bot)).toEqual('object');
  });

  it('should have a function for sending messages', function(){
    expect(tmw.sendMessage).toBeDefined();
    expect(typeof(tmw.sendMessage)).toEqual('function');
  });

  it('should have a method for registering commands', function(){
    expect(tmw.registerCommand).toBeDefined();
    expect(typeof(tmw.registerCommand)).toEqual('function');
  });

});