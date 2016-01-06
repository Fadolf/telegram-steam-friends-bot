"use strict";

var path = require("path");
var rp = require("request-promise");
var template = require("string-template");
var config = require("../config/config.js").config();


//PRIVATE METHODS
//============================================================

//Array filter function, true to keep the object, false otherwise 
function filterOnline(info)
{
	if(info.personastate !== 0)
		return true;
	else
		return false;
}

let instance = null;

//CLASS DEFINITION
//============================================================
class Steam{

	constructor()
	{
		this.token = config.steamAPIKey;
		this.apiCalls = 0;
		this.url_template = "http://api.steampowered.com/{interface}/{service}/{version}/"; 
		this.rooms = [];

		if(!instance)
			instance = this;

		return instance;
	}

	init()
	{
		checkStorage(this.files_path);
	}

	requestFriendsPromise(userid)
	{
		let url = template(this.url_template,
		{
			interface: "ISteamUser",
			service: "GetFriendList",
			version: "v0001"
		});

		let parameters = {
			key: this.token,
			steamid: userid
		};

		let options = {
			uri: url,
			qs: parameters,
			headers:{
				'User-Agent': 'Request-Promise'
			},
			json: true
		};

		return rp(options);
	}

	requestPlayerSummariesPromise(list)
	{
		let url = template(this.url_template,
		{
			interface: "ISteamUser",
			service: "GetPlayerSummaries",
			version: "v0002"
		});

		let parameters = {
			key: this.token,
			steamids: list.toString() //or .join(",")
		};

		let options = {
			uri: url,
			qs: parameters,
			headers:{
				'User-Agent': 'Request-Promise'
			},
			json: true
		};

		return rp(options);
	}

	getOnlineFriends(id,callback)
	{
		var self = this;

		self.requestFriendsPromise(id)
		.then(function(response){
			var friends = response.friendslist.friends;
			
			if(friends===null || friends === undefined || !Array.isArray(friends)){
				throw "Friends could not be fetched";
			}
			
			var friendsIDs = friends.map(function(f){
				return f.steamid;
			});

			return self.requestPlayerSummariesPromise(friendsIDs.toString());			
		})
		.then(function(apiResponse){
			var players = apiResponse.response.players; 

			if(players===null || players === undefined || !Array.isArray(players)){
				throw "Friends could not be fetched";
			}
			var onlinePlayers = players.filter(filterOnline);
			callback(onlinePlayers);
		})
		.catch(function(error){
			console.log("Error fetching online friends for user " + error);
		});
	}
}

module.exports = Steam;