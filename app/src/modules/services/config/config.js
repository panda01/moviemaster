/*
//0. init
//1. load
//2. save
*/

/*
holds state / app level properties (i.e. logged in status, session id, etc.) that are needed across multiple controllers/etc.
*/

'use strict';

angular.module('app').
provider('appConfig', function(){
	this.server ='';


	this.dirPaths ={
	'appPath':'/',
	'appPathLink':'/',
	'appPathLocation':'/',
	'staticPath': '/src/',
	'pagesPath': 'modules/pages/',			//need to prepend staticPath for use
	'rootPath': '/',
	'serverUrl': "http://localhost/",
	'serverPath': "http://localhost:3000/",
	'publicPath': "http://localhost:3000/",
	'homeDirectory': false,
	'images':"common/img/",		//will have staticPath prepended to it
	'uploads':"uploads/",		//will have appPath prepended to it
	'ajaxUrlParts':{
		'main':"http://localhost:3000/"
	},
	'ajaxUrl':{
		'api':"http://localhost:3000/api/"
	},
	'useCorsUrls':{
		'all': 0
	}
	};
	this.info ={
	'timezone':{
		'name':'',
		'offset':'',
		'minutes':''
	}
	};

	//data / state storage
	this.data ={};
	this.state ={'loggedIn':false};
	
	//will hold the raw cfgJson object unaltered
	this.cfgJson ={};

	this.$get = function() {
		return {
			hosts: this.hosts,
			//serverInfo: this.serverInfo,
			//server: this.server,
			dirPaths: this.dirPaths,
			info: this.info,
			data: this.data,
			state: this.state,
			cfgJson: this.cfgJson,

			//1.
			/*
			@param
				mainKey =string of main key that matches a variable above, i.e.: 'state', 'data' (default)
			*/
			load: function(key, params) {
				var defaults ={'mainKey':'data'};
				params =angular.extend(defaults, params);
				var val =false;
				if(this[params.mainKey][key] !==undefined)
					val =this[params.mainKey][key];
				return val;
			},

			//2.
			/*
			@param
				mainKey =string of main key that matches a variable above, i.e.: 'state', 'data' (default)
			*/
			save: function(key, value, params) {
				var defaults ={'mainKey':'data'};
				params =angular.extend(defaults, params);
				this[params.mainKey][key] =value;
			}
		};
	};

	//0.
	this.init =function(params) {
		// this.dirPaths.images =this.dirPaths.appPath+this.dirPaths.images;
		this.dirPaths.images =this.dirPaths.staticPath+this.dirPaths.images;
		this.dirPaths.uploads =this.dirPaths.appPath+this.dirPaths.uploads;
		this.dirPaths.homeDirectory =this.dirPaths.serverUrl;
		
		//get timezone offset
		var getOffsetFromMinutes =function(minutesTotal, params) {
			var ret ={'z':'', 'minutes':minutesTotal};
			
			// var posNegSwitch =false;		//not sure if should be "420" or "-420" so this toggles it..
			var posNeg ='+';
			// if(posNegSwitch) {
				// posNeg ='-';
				// ret.minutes =ret.minutes *-1;
			// }
			if(minutesTotal <0) {
				posNeg ='-';
				// if(posNegSwitch) {
					// posNeg ='+';
				// }
				minutesTotal =minutesTotal *-1;		//force positive
			}
			var hours = Math.floor(minutesTotal /60).toString();
			var minutes =(minutesTotal %60).toString();
			if(hours.length ==1) {
				hours ='0'+hours;
			}
			if(minutes.length ==1) {
				minutes ='0'+minutes;
			}
			ret.z =posNeg+hours+':'+minutes;
			return ret;
		};
		
		var minutesTotal =new Date().getTimezoneOffset();
		var ret1 =getOffsetFromMinutes(minutesTotal, {});
		this.info.timezone.offset =ret1.z;
		this.info.timezone.minutes =ret1.minutes;
		
		/*
		var timezone = jstz.determine();
		this.info.timezone.name =timezone.name();
		//get offset
		var xx;
		for(xx in jstz.olson.timezones) {
			if(jstz.olson.timezones[xx] ==this.info.timezone.name) {
				var minutesTotal =xx.slice(0, xx.indexOf(','));
				this.info.timezone.offset =getOffsetFromMinutes(minutesTotal, {}).z;
				break;
			}
		}
		*/
		// console.log('timezone: '+this.info.timezone.name+' '+this.info.timezone.offset+' '+this.info.timezone.minutes);
		//end: get timezone offset
		
		
		
		
		
		this.cfgJson ={
			"versions":{
				"cfg":"0.0.0",
				"pkg":"0.0.0"
			},
			"env":"development",
			"operatingSystem":"linux",
			"operatingSystemComment":"One of: 'windows', 'mac', 'linux'",
			"forever":0,
			"app":{
				"name":"moviemaster",
				"title":"Movie Master"
			},
			"platform":"",
			"server":{
				"domain":"localhost",
				"scheme":"http",
				"port":3000,
				"_httpsPort":443,
				"httpPort":3002,
				"httpRedirectPort":3000,
				"_httpRedirectPortComment":"set to 'false' to have no port - i.e. for production use with iptables routing",
				"socketIOEnabled":true,
				"_socketPort":3001,
				"_socketPortComment":"Must be same port with express?",
				"socketPort":3000,
				"serverPath":"/",
				"appPath":"/",
				"staticFilePath":"/src/",
				"staticPath":"/src/"
			},
			"cors":{
				"domains":[
					"localhost"
				],
				"frontendUseCors":0
			},
			"db":{
				"fullURI":"",
				"host":"localhost",
				"port":27017,
				"database":"moviemaster",
				"username":false,
				"password":false
			},
			"logKey":"dev",
			"cookie":{
				"secret":"o@:&M<ZN PF(s.T)3?*;^1~TDjNE}=3xy$SpB7dE%dA-}fAn.b[RRU{cg+P#[):/"
			},
			"ssl":{
				"enabled":false,
				"key":"/ssl/ssl.key",
				"cert":"/ssl/ssl.crt",
				"ca":[
				]
			},
			"rpc":{
				"autoDoc":true,
				"autoDocUrl":"help"
			},
			"test_coverage":{
				"jasmine_node":{
					"failTask":true,
					"branches":40,
					"functions":60,
					"statements":60,
					"lines":60
				},
				"angular_karma":{
					"branches":85,
					"functions":85,
					"statements":85,
					"lines":85
				}
			},
			"ci":{
				"server":{
					"port":3009,
					"portCiServer":3010
				},
				"emails_failed":[
				]
			},
			"less":{
				"dirPathRootPrefix":""
			},
			"email":{
				"domain":"localhost",
				"addresses":{
					"noReply":"noreply"
				},
				"from":"admin@moviemaster.com",
				"from_name":"Admin",
				"mandrillApiKey":"8X-1bNRWtA4rbneppkqahw",
				"mandrillApiKeyComment":"Make sure to CHANGE this!"
			},
			"sms":{
			},
			"facebook":{
				"scope":"email,user_birthday,publish_actions",
				"appId":"195380783916970",
				"appSecret":"4690b0f547b8cbe114dc84abab150c10",
				"_comment":"Make sure to CHANGE / set appId and appSecret!"
			},
			"twitter":{
				"consumerKey":"4wTFTzPvchVYAECdulQBCVcpk",
				"consumerSecret":"Sq1UeJbL4PSf5WyP6TUkAt8uFIxTFvzf2D8IBkvkZriu0WV0vr",
				"consumerComment":"Make sure to CHANGE the key and secret!",
				"callback_url":"http://127.0.0.1:3000/callback-twitter-auth",
				"handle":""
			},
			"google":{
				"clientId":"486630891328.apps.googleusercontent.com",
				"clientIdComment":"Make sure to CHANGE this!",
				"clientSecret":""
			},
			"sauceLabs":{
				"user":"",
				"key":""
			}
		};

		
		
		
		
	};

	this.init();		//call to init stuff
});