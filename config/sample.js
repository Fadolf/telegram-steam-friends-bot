'use strict';

let config = {
  telegramToken: '',
  steamAPIKey: '',
  webhook: '',
  certs: [],
  mongoConnectionString: ''
};

exports.config = function(){
  return config;
}