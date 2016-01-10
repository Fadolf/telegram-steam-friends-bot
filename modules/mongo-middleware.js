"use strict";


let MongoClient = require('mongodb').MongoClient;
let tmiddleware = require('../modules/telegram-middleware').create();
let config = require('../config/config.js').config();
let instance = null;


function connectionCallback(err, db)
{
  if(err) {
    return console.log(err);
  }      

  this.db = db;

  db.createCollection('persona', {strict: true}, function(err, collection){
    console.log("Collection:" + collection);
  });
}

class MongoMiddleware
{
  constructor()
  {
    if(!instance)
      instance = this;

    MongoClient.connect(config.mongoConnectionString, connectionCallback.bind(this));

    return instance;
  }

  createAccount(p)
  {
    var persona = this.db.collection('persona');
    var writeResult = persona.update({telegramId: p.telegramId}, p, { upsert: true }, function(err, nAffected, raw){;
      if(err){
        tmiddleware.sendMessage(p.telegramId, 'Error creating your account');
        console.log(err);
      }
      else
      {
        tmiddleware.sendMessage(p.telegramId, 'Account created.');
      }
    });
  }

  getAccount(msg, callback)
  {
    var persona = this.db.collection('persona');
    persona.findOne({telegramId: msg.from.id}, function(err, item){
      callback(err, item);
    });
  }  
}





exports.get = function()
{
  return new MongoMiddleware();
}
