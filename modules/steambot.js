"use strict";

var steam = require("./steam.js");

function OnGetPlayerSummaries(error, response, body)
{

	


}

class SteamBot{

	constructor: function()
	{
		this.s = steam.create({
			token: "3A565254D7278BA536B34B197C830CDD"
		});
	}

	


}