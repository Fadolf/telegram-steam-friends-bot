var request = require('request');
var config = require('./config/config.js');

function callback(info)
{
	console.log('Sending telegram message');
	for(i=0;i<info.length;i++)
	{
		console.log('steamid: ' + info[i].personaname);
	}
}

//var Steam = require(__dirname+'/modules/steam.js').create();
//Steam.getOnlineFriends('76561198043887092',callback);




/*Steam.requestPlayerSummariesPromise(['76561198043887092','76561197986196133'])
.then(function(response){
	console.log(response.response);
})
.catch(function(err){
	console.log(err);
});
*/