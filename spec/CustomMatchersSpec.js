'use strict';



//Before every spec, Jasmine will add the following matchers defined
//in this file.
beforeEach(function(){
	var myMatchers = {
		toBeString: function(v){
			
			return{
				compare: function(actual,expected)
				{
					if(expected === undefined){
						expected = '';
					}

					var result = {};

					result.pass = typeof(actual) === 'string' && 
									actual.length > 0 &&
									actual != null;

					if(result.pass)
					{
						result.message = 'Expected ' + actual + ' to be a string';
					}
					else
					{
						result.message = 'Expected ' + actual + ' to be a string, but it was not';
					}

					return result;

				}
			}		
		},
		toBeSteamToken: function(v){

			var STEAM_TOKEN_LENGTH = 32;

			return{
				
				compare: function(actual,expected){
					
					if(expected === undefined){
						expected = '';
					}

					//Check if the token contains non alphanumeric characters
					var regex = /[^a-zA-Z\d]/;
					var result = {};

					result.pass = actual.length === STEAM_TOKEN_LENGTH &&
									regex.test(actual) === false;


					if(result.pass)
					{
						result.message = 'Expected ' + actual + ' to be a Steam token';
					}
					else
					{
						result.message = 'Expected ' + actual + ' to be a Steam token, but it '+
											'is not a valid Steam token';
					}

					return result;
					
				}

			};


		},
		toBeValidPath: function(v)
		{
			return{

				compare: function(actual,expected)
				{
					if(expected === undefined){
						expected = '';
					}

					var result = {};

					result = fs.existsSync(actual);

					if(result.pass)
					{
						result.message = 'Expected ' + actual + 'to be a valid path';
					}
					else
					{
						result.message = 'Expected ' + actual + 'to be a valid path, but '+
											'it does not exist or is invalid';
					}




				}
			};


		}		


	};

	//This function registers all matchers to be available in any
	//Jasmine spec scope (describe block -> it part).
	jasmine.addMatchers(myMatchers);

});



