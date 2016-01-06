'use strict';
require('jasmine-expect');
let CreateAccount = require('../modules/create-account');
let TelegramCommand = require('../modules/telegram-command');


var ca = new CreateAccount();

describe('CreateAccount', function() {
  describe('Inheritance tests', function() {    

    it('should define a TelegramCommand', function() {
      expect(ca instanceof TelegramCommand).toBe(true);
    });
    it('should define a constructor', function() {
      expect(ca.constructor).toBeDefined();
      expect(ca.constructor.name).toEqual('CreateAccount');
    });
    it('should have the parent properties', function() {
      expect(ca.pattern).toBeDefined();
      expect(ca.pattern).toBeString();
      expect(ca.callback).toBeDefined();
      expect(ca.callback).toBeFunction();
      expect(ca.tmw).toBeDefined();
      expect(ca.tmw).not.toBeNull();
      expect(ca.tmw.constructor.name).toEqual('TelegramMiddleware');
    });
  });

  it('should have pattern set to /\/create_account/', function() {
    expect(ca.pattern).toEqual('/\/create_account/');
  });
});