//You should install additional matchers
//https://github.com/JamieMason/Jasmine-Matchers



"use strict";
require("jasmine-expect");

var Steam = require("../modules/steam.js");


describe("Steam",function(){

	var s=new Steam();

	it("should be not null", function(){
		expect(s).not.toBeNull();
	});

	it("should be defined", function(){
		expect(s).toBeDefined();
	});

	it("should have a steam token", function(){
		expect(s.token).toBeDefined();
		expect(s.token).not.toBeNull();
		expect(s.token).toBeString();
		expect(s.token).toBeSteamToken();
	});

	it("should have initialized API calls to 0", function(){
		expect(s.apiCalls).toBeDefined();
		expect(s.apiCalls).not.toBeNull();
		expect(s.apiCalls).toEqual(0);
	});

	it("should have initialzed room storage", function(){
		expect(s.rooms).toBeDefined();
		expect(s.rooms).not.toBeNull();
		expect(s.rooms).toBeArray();
		expect(s.rooms).toBeEmptyArray();
	});

	it("should contain an url template", function(){
		expect(s.url_template).toBeDefined();
		expect(s.url_template).not.toBeNull();
		expect(s.url_template).toBeString();
	});

	describe("requestPlayerSummariesPromise", function(){
		
		//Notice the "done" argument for the function
		//This is necessary for testing asynchronous functions
		it("should get player summaries", function(done){
			var steamID = "76561197960435530";

			var testPlayer = function(player)
			{
				expect(player).toBeDefined();
				expect(player.response.players[0].steamid).toEqual(steamID);
				done();
			};

			var failTest = function(error)
			{
		    expect(error).toBeUndefined();
		    done();
		  };

			s.requestPlayerSummariesPromise("76561197960435530")
			.then(testPlayer)
			.catch(failTest);
		});
	});

	describe("requestFriendsPromise", function(){
		
		//Notice the "done" argument for the function
		//This is necessary for testing asynchronous functions
		it("should get player friends", function(done){
			var steamID = "76561197960435530",
					friendCount = 301; //At the moment of testing

			var testFriendCount = function(friendsResponse)
			{
				expect(friendsResponse).toBeDefined();
				expect(friendsResponse.friendslist.friends.length).toEqual(friendCount);
				done();
			};

			var failTest = function(error) 
			{
		    expect(error).toBeUndefined();
		    done();
		  };

			s.requestFriendsPromise("76561197960435530")
			.then(testFriendCount)
			.catch(failTest);
		});
	});


	it('should increment api calls', function() {
		var steamID = "76561197960435530",
			calls = s.apiCalls;

		s.requestFriendsPromise(steamID)
		.then(null)
		.catch(null);

		expect(s.apiCalls).toEqual(calls+1);
	});

	it('should reset API calls', function() {
		s.apiCalls = 55555;
		s.resetAPILimit();
		
		expect(s.apiCalls).toEqual(0);
	});

});