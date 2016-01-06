'use strict';
require('jasmine-expect');

var Command = require('../modules/command.js');

describe('Command', function(){

  let parameter = {
      pattern: 'blabla',
      callback: function(msg, match){
        return 2;
      }
  };

  let c = Command.create(parameter);
  

  it('should create an instance of Command when imported', function(){
    expect(c).not.toBeNull();
    expect(c).toBeDefined();
    expect(c.constructor.name).toEqual('Command');
  });

  it('should define pattern and callback properties', function(){
    expect(c.pattern).toBeDefined();
    expect(c.pattern).toBeString();
    expect(c.callback).toBeDefined();
    expect(c.callback).toBeFunction();
  });

});