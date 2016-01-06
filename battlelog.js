"use strict";

var request = require("request");
var cheerio = require("cheerio");

class Battlelog{


	
	constructor()
	{
		this.genericURL = "http://battlelog.battlefield.com/bf4/user/" 
	}

	getPageFor(someone){
		var url = this.genericURL + someone;


		request(url,function(error,response,body){
			if(!error && response.statusCode === 200)
			{
				//console.log(body);
				var $ = cheerio.load(body);
				console.log($(".information .pull-right"));
			}
		

		});

	}
}

exports.create = function(parameters)
{
	return new Battlelog();
}