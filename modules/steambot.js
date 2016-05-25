"use strict";

let telegram = require('../modules/telegram-middleware').create();
let mongo = require('../modules/mongo-middleware').get();
let SteamClass = require('../modules/steam.js'),
  steam = new SteamClass();

let states = ['Offline', 'Online', 'Busy', 'Away', 'Snooze', 'Looking to trade', 'Looking to play'];

function getPersonaState(stateIndex)
{
  if(!stateIndex)
    return states[stateIndex] + ' (private profile?) ';
  else
    return states[stateIndex];  
}


function comparatorOnlineFirst(a,b)
{
  if(a.gameextrainfo && a.gameextrainfo!=undefined)
  {
    if(b.gameextrainfo && b.gameextrainfo!=undefined)
      return a.personaname.localeCompare(b.personaname);

    else
      return -1;
  }

  else if(b.gameextrainfo && b.gameextrainfo!=undefined){
    if(a.gameextrainfo && a.gameextrainfo!=undefined)
      return b.personaname.localeCompare(a.personaname);

    else
      return 1;
  }

  else
     return a.personaname.localeCompare(b.personaname);
}


function sortFriends(collection, comparator)
{
  var sorted = collection.sort(comparator);

  for (var i = 0; i < sorted.length; i++) {
    console.log(sorted[i].personaname + ' ' + sorted[i].gameextrainfo);
  }

  return sorted;
}


let commands = 
[
  {
    pattern: /\/create_account( +[0-9]+)?/,
    callback: function(msg, match)
    {      
      var chatId = msg.from.id;
      var steamId = match[1];
      var message = '';
      if(steamId === undefined){

        message = '*Please, call this command followed by your Steam id*\n'+
                  'If you don\'t know your id, please, use one of this `sites`: \n\n'+
                  'http://steamidfinder.com/\n'+
                  'https://steamid.co/\n\n'+
                  'Use the one similar to `7656119xxxxxxxxxx`';

        telegram.sendMessage(chatId, message, {parse_mode: 'Markdown'});
      }
      else{
        steamId.trim();
        message = 'Creating steam account for ID: ' + steamId;
        telegram.sendMessage(chatId, message);

        mongo.createAccount({
          telegramId: msg.from.id,
          telegramName: msg.from.username,
          steamId: steamId
        });
      }      
    }
  },
  {
    /*Retrieve account, request information to Steam API and then return 
    friends online (if available).*/
    pattern: /\/my_friends_online/,
    callback: function(msg, match)
    {

      if(msg.chat.type === 'group'){
        var message =  'I am not going to share your friends info here. Type that command '+
         'in a conversation with me';

        console.log(msg);
        telegram.sendMessage(msg.chat.id, message, {reply_to_message_id: msg.message_id});
        return;
      }


      mongo.getAccount(msg, function(err, item){
        if(err){
          telegram.sendMessage(msg.from.id, 'Error retrieving your friends');
        }
        else{
          steam.getOnlineFriends(item.steamId, function(friends){
            var message = '';
            if(!friends)
            {
              message= 'I could not retrieve the information from the API. Maybe, I have just hit the API limit for today\n';
            }
            else
            {
              message+= '*Your friends online*\n';
            
              var sortedFriends = sortFriends(friends, comparatorOnlineFirst);

              sortedFriends.forEach(f => {
                let state=getPersonaState(f.personastate);
                let game= f.gameextrainfo || '';
                message+='`' + f.personaname + '`    (' + state + ')' + ' _' + game + '_\n';
              });
            }
            telegram.sendMessage(msg.from.id, message, {parse_mode: 'Markdown', 
              reply_to_message_id: msg.message_id});
          });
        }
      });
    }
  }
];

module.exports.init = function()
{
  commands.forEach(c => {
    telegram.registerCommand(c);
  });
};