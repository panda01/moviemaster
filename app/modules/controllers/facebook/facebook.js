/**
NOTE: this currently relies on global.cfgJson to exist and be set correctly for configuration
@example config
{
	"facebook":{
		"scope": "email,publish_actions",
		"appId": "xxxx",
		"appSecret": "xxxx",
		"_comment":"Make sure to CHANGE / set appId and appSecret!"
	}
}

@module facebook
@class facebook

@toc
1. me
2. createAppObject
3. publishObjectStory
4. createAndPublishObject
5. publishUserFeed
*/

'use strict';

var Q = require('q');
var lodash = require('lodash');
var request = require('request');
var qs =require('qs');

var dependency =require('../../../dependency.js');
var pathParts =dependency.buildPaths(__dirname, {});

var AuthMod =require(pathParts.controllers+'auth/auth.js');
var UserMod =require(pathParts.controllers+'user/user.js');

var cfg =global.cfgJson;

var self;

var defaults = {
};

/**
Sends the actual HTTP request
@toc 0.
@method sendRequest
@param {String} urlPart i.e. 'me'
@param {Object} reqParams Object to be used with `request` plugin; will be extended with some defaults
	@param {String} method One of 'post', 'get', etc.
	@param {Object} [json]
	@param {Object} [qs] GET params
@param {Object} [params]
*/
function sendRequest(urlPart, reqParams, params) {
	var ret ={msg: 'facebook sendRequest '};
	var deferred =Q.defer();
	var fullUrl ='https://graph.facebook.com/v2.0/'+urlPart;
	// var method ='get';
	var reqObj ={
		'url':fullUrl,
		// 'method':method,
	};
	reqObj =lodash.merge(reqObj, reqParams);
	request(reqObj, function(error, response, data)
	{
		console.log('reqObj return:');
		// console.log(response);
		console.log(data);
		if(error) {
			ret.msg +='request '+urlPart+' error: '+error+' ';
			console.log(ret.msg);
			deferred.reject(ret);
		}
		else {
			if(typeof(data) =='string') {
				try {
					data =JSON.parse(data);
				}
				catch(e) {
					console.log('data NOT JSON');
				}
			}
			if(data.error !==undefined) {
				ret.msg +='request '+urlPart+' ERROR: data: '+JSON.stringify(data)+' ';
				console.log(ret.msg);
				ret.data =data;
				deferred.reject(ret);
			}
			else {
				console.log(ret.msg+'request '+urlPart+' success: data: '+JSON.stringify(data));
				deferred.resolve(data);
			}
		}
	});
	return deferred.promise;
}

/**
Facebook module constructor
@class Facebook
@constructor
@param options {Object} constructor options
**/
function Facebook(options){
    this.opts = lodash.merge({}, defaults, options||{});

	self = this;
}

/**
@toc 1.
@method me
@param {Object} data
	@param {String} access_token The user access token to get user info for
@param {Object} params
@return {Object} (via Promise)
		@param {Number} code
		@param {String} msg
		@param {Object} user
**/
Facebook.prototype.me = function(db, data, params) {
	var deferred = Q.defer();
	var ret ={code:0, msg:'Facebook.me ', user:false};

	var reqObj ={
		method: 'get',
		qs: {
			access_token: data.access_token
		}
	};
	var promise =sendRequest('me', reqObj, {});
	promise.then(function(ret1) {
		//do user import & login
		var vals ={
			type: 'facebook',
			user: {
				first_name: ret1.first_name,
				last_name: ret1.last_name
			},
			socialData: {
				id: ret1.id,
				token: data.access_token
			}
		};
		if(ret1.email !==undefined) {
			vals.user.email =ret1.email;
		}
		
		AuthMod.socialLogin(db, vals, {})
		.then(function(retLogin) {
			deferred.resolve(retLogin);
		}, function(err) {
			deferred.reject(err);
		});
		
	}, function(err) {
		deferred.reject(err);
	});

	return deferred.promise;
};

/**
@toc 2.
@method createAppObject
@param {Object} data
	@param {String} object_type E.g. 'book' or 'books.book'
	@param {Object} object The object. Typically includes title, image, url, description fields
		@param {String} image URL path to publicly accessible image
		@param {String} url The publicly accessible url to link to for this object
		@param {Object} data The object properties with at least the required properties for this object type (varies by object type)
		@param {String} [title]
		@param {String} [description]
@param {Object} params
@return {Object} (via Promise)
		@param {Number} code
		@param {String} msg
		@param {String} object_id The id for the object created on Facebook
**/
Facebook.prototype.createAppObject = function(db, data, params) {
	var deferred = Q.defer();
	var ret ={code:0, msg:'Facebook.createAppObject ', object_id: false};
	
	var reqObj ={
		method: 'post',
		body: qs.stringify({
			access_token: cfg.facebook.appId+'|'+cfg.facebook.appSecret,
			object: JSON.stringify(data.object)		//needs to be "JSON encoded"
		})
	};
	var promise =sendRequest('app/objects/'+data.object_type, reqObj, {});
	promise.then(function(ret1) {
		ret.object_id =ret1.id;
		deferred.resolve(ret);
	}, function(err) {
		deferred.reject(err);
	});

	return deferred.promise;
};

/**
@toc 3.
@method publishObjectStory
@param {Object} data
	@param {String} action_type E.g. 'books.reads'
	@param {String} object_type E.g. 'book' or 'books.book'
	@param {String} object_id The id for the object created on Facebook
	@param {String} [access_token] The user access token to publish for (this will save a database call to look it up from the user id). One of 'user_id' or 'access_token' is required.
	@param {String} [user_id] The user id to publish for (this will require a database call to look up the token from the user id and will NOT work if the user does not yet have a facebook access token). One of 'user_id' or 'access_token' is required.
@param {Object} params
@return {Object} (via Promise)
		@param {Number} code
		@param {String} msg
**/
Facebook.prototype.publishObjectStory = function(db, data, params) {
	var deferred = Q.defer();
	var ret ={code:0, msg:'Facebook.publishObjectStory '};
	
	var publishLocal =function() {
		var postData ={
			access_token: data.access_token
		};
		// postData[data.object_type] =data.object_id;
		postData.object =data.object_id;		//bad documentation; must be 'object' as the key
		var reqObj ={
			method: 'post',
			body: qs.stringify(postData)
		};
		var promise =sendRequest('me/'+data.action_type, reqObj, {});
		promise.then(function(ret1) {
			deferred.resolve(ret);
		}, function(err) {
			deferred.reject(err);
		});
	};
	
	//if don't have access token, look it up from user id first
	if(data.access_token ===undefined) {
		if(data.user_id !==undefined) {
			//get facebook access token for this user
			UserMod.read(db, {_id: data.user_id, fields:{social:1} }, {})
			.then(function(retUser) {
				if(retUser.result && retUser.result.social !==undefined && retUser.result.social.facebook !==undefined && retUser.result.social.facebook.token !==undefined) {
					data.access_token =retUser.result.social.facebook.token;
					publishLocal();
				}
				else {
					ret.code =2;
					ret.msg +="Error getting user Facebook token for user id: "+data.user_id;
					deferred.reject(ret);
				}
			}, function(retErr) {
				deferred.reject(retErr);
			});
		}
		else {
			ret.code =1;
			ret.msg +="Must supply either an access_token or a user_id";
			deferred.reject(ret);
		}
	}
	else {
		publishLocal();
	}

	return deferred.promise;
};

/**
Convenience method that combines createAppObject and publishObjectStory into one call. This is effectively "share on facebook".
@toc 4.
@method createAndPublishObject
@param {Object} data
	@param {String} object_type E.g. 'book' or 'books.book'
	@param {Object} object The object. Typically includes title, image, url, description fields
		@param {String} image URL path to publicly accessible image
		@param {String} url The publicly accessible url to link to for this object
		@param {String} [title]
		@param {String} [description]
	@param {String} action_type For compound actions, this is either dot separated for "Common Actions" or colon separated for "Custom Actions". E.g. 'books.reads', 'og.likes', 'cookbook:eat'
	@param {String} [access_token] The user access token to publish for (this will save a database call to look it up from the user id). One of 'user_id' or 'access_token' is required.
	@param {String} [user_id] The user id to publish for (this will require a database call to look up the token from the user id and will NOT work if the user does not yet have a facebook access token). One of 'user_id' or 'access_token' is required.
@param {Object} params
@return {Object} (via Promise)
		@param {Number} code
		@param {String} msg
		
@usage
	var urlBase ='http://example.com/';
	var vals ={
		object_type: 'product.item',
		object: {
			image: urlBase+'src/common/img/ie-chrome-logo.png',
			url: urlBase+'dev-test/social',
			title: 'og title!',
			description: 'og description!',
			//required product.item properties from: https://developers.facebook.com/docs/reference/opengraph/object-type/product.item/
			data: {
				availability: 'in stock',
				condition: 'new',
				price: {
					amount: 1.5,
					currency: 'USD'
				},
				retailer_item_id: 'retailerid'
			}
		},
		action_type: 'og.likes',
		// access_token: '[userFacebookAccessToken]'
		user_id: '[userId]'
	};
	Facebook.createAndPublishObject(db, vals, {})
	.then(function(ret1) {
		//success
	}, function(retErr) {
		//error
	});
**/
Facebook.prototype.createAndPublishObject = function(db, data, params) {
	var deferred = Q.defer();
	var ret ={code:0, msg:'Facebook.createAndPublishObject '};
	
	//create object
	self.createAppObject(db, data, {})
	.then(function(retCreate) {
		
		//publish story (share)
		data.object_id =retCreate.object_id;
		self.publishObjectStory(db, data, {})
		.then(function(retPublish) {
			deferred.resolve(ret);
		}, function(retErr) {
			deferred.reject(retErr);
		});
		
	}, function(retErr) {
		deferred.reject(retErr);
	});

	return deferred.promise;
};

/**
The more standard / simple share on Facebook
@toc 5.
@method publishUserFeed
@param {Object} data
	@param {String} [message] The user message for this post. One of 'message' or 'link' is required.
	@param {String} [link] The publicly accessible url to link to for this post. One of 'message' or 'link' is required.
	@param {String} [picture] URL path to publicly accessible image. Only relevant if 'link' is set.
	@param {String} [name] Only relevant if 'link' is set.
	@param {String} [caption] Only relevant if 'link' is set.
	@param {String} [description] Only relevant if 'link' is set.
	@param {String} [access_token] The user access token to publish for (this will save a database call to look it up from the user id). One of 'user_id' or 'access_token' is required.
	@param {String} [user_id] The user id to publish for (this will require a database call to look up the token from the user id and will NOT work if the user does not yet have a facebook access token). One of 'user_id' or 'access_token' is required.
@param {Object} params
@return {Object} (via Promise)
		@param {Number} code
		@param {String} msg
		
@usage
	var urlBase ='http://example.com/';
	var vals ={
		message: 'My message',
		link: urlBase+'dev-test/social',
		picture: urlBase+'src/common/img/ie-chrome-logo.png',
		name: 'name!',
		caption: 'caption!',
		description: 'description!',
		// access_token: '[userFacebookAccessToken]'
		user_id: '[userId]'
	};
	Facebook.publishUserFeed(db, vals, {})
	.then(function(ret1) {
		//success
	}, function(retErr) {
		//error
	});
**/
Facebook.prototype.publishUserFeed = function(db, data, params) {
	var deferred = Q.defer();
	var ret ={code:0, msg:'Facebook.publishUserFeed '};
	
	var publishLocal =function() {
	
		//strip out some keys so only the facebook ones we want to send remain
		var postData, skipParams;
		skipParams =['user_id', 'authority_keys'];
		postData =lodash.omit(data, skipParams);
		
		var reqObj ={
			method: 'post',
			body: qs.stringify(postData)
		};
		var promise =sendRequest('me/feed', reqObj, {});
		promise.then(function(ret1) {
			deferred.resolve(ret);
		}, function(err) {
			deferred.reject(err);
		});
	};
	
	//if don't have access token, look it up from user id first
	if(data.access_token ===undefined) {
		if(data.user_id !==undefined) {
			//get facebook access token for this user
			UserMod.read(db, {_id: data.user_id, fields:{social:1} }, {})
			.then(function(retUser) {
				if(retUser.result && retUser.result.social !==undefined && retUser.result.social.facebook !==undefined && retUser.result.social.facebook.token !==undefined) {
					data.access_token =retUser.result.social.facebook.token;
					publishLocal();
				}
				else {
					ret.code =2;
					ret.msg +="Error getting user Facebook token for user id: "+data.user_id;
					deferred.reject(ret);
				}
			}, function(retErr) {
				deferred.reject(retErr);
			});
		}
		else {
			ret.code =1;
			ret.msg +="Must supply either an access_token or a user_id";
			deferred.reject(ret);
		}
	}
	else {
		publishLocal();
	}

	return deferred.promise;
};

/**
Module exports
@method exports
@return {Facebook} Facebook constructor
**/
module.exports = new Facebook({});