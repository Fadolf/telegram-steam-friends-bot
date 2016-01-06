'use strict';

class Command
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
  }
};

exports.create = function(parameters){
  return new Command(parameters);
}