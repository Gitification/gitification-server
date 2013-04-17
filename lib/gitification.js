'use strict';

var restify = require('restify');
var rewire = require('rewire');

// load controllers, using rewire for variable injection
var applications = rewire('./../controllers/applications');
var leaderboard = rewire('./../controllers/leaderboard');
var users = rewire('./../controllers/users');
var events = rewire('./../controllers/events');
var event_types = rewire('./../controllers/event_types');
var rules = rewire('./../controllers/rules');
var badges = rewire('./../controllers/badges');
var badge_cats = rewire('./../controllers/badge_categories');

// load db
var db = require('./../db/static');

// load message factory
var msg_fact = require('./../helpers/reply_message_factory');

var server = restify.createServer();
// Allow CORS response. Need to be called before the "server.listen"
server.use(restify.CORS());
server.use(restify.fullResponse());

server.use(restify.bodyParser()); // parse form data (post)
server.listen(8080, function () {
	console.log('%s listening at %s', server.name, server.url);
});

// TODO this is needed for your tests to pass.....
exports.awesome = function () {
	return 'awesome';
};

// configure controllers
var controllers = [applications, leaderboard, users, events,
	event_types, rules, badges, badge_cats];
for (var i = 0; i < controllers.length; i++) {
	controllers[i].__set__("db", db);
	controllers[i].__set__("msg_fact", msg_fact);
}

////////////////////////////////////////////////////////////////////////////////////
// Applications
////////////////////////////////////////////////////////////////////////////////////

// get
server.get('/applications', applications.findAll);
server.get('/applications/:appid', applications.findById);

// post
server.post('/applications', applications.create);

////////////////////////////////////////////////////////////////////////////////////
// Leaderboard
////////////////////////////////////////////////////////////////////////////////////

// get
server.get('/applications/:appid/leaderboard', leaderboard.findAll);

////////////////////////////////////////////////////////////////////////////////////
// Users
////////////////////////////////////////////////////////////////////////////////////

// get
server.get('/applications/:appid/users', users.findAll);
server.get('/applications/:appid/users/:userid', users.findById);
server.get('/applications/:appid/users/:userid/badges', users.findBadgesById);

// post
server.post('/applications/:appid/users', users.create);

// put
server.put('/applications/:appid/users/:userid', users.update);

// delete
server.del('/applications/:appid/users/:userid', users.remove);

////////////////////////////////////////////////////////////////////////////////////
// Events
////////////////////////////////////////////////////////////////////////////////////

// get
server.get('/applications/:appid/events', events.findAll);
server.get('/applications/:appid/events/:eventid', events.findById);

// post
server.post('/applications/:appid/events', events.create);

////////////////////////////////////////////////////////////////////////////////////
// Event Types
////////////////////////////////////////////////////////////////////////////////////

// get
server.get('/applications/:appid/events/types', event_types.findAll);
server.get('/applications/:appid/events/types/:typeid', event_types.findById);

// post
server.post('/applications/:appid/events/types', event_types.create);

////////////////////////////////////////////////////////////////////////////////////
// Rules
////////////////////////////////////////////////////////////////////////////////////

// get
server.get('/applications/:appid/rules', rules.findAll);
server.get('/applications/:appid/rules/:ruleid', rules.findById);

// post
server.post('/applications/:appid/rules', rules.create);

// put
server.put('/applications/:appid/rules/:ruleid', rules.update);

// delete
server.del('/applications/:appid/rules/:ruleid', rules.remove);

////////////////////////////////////////////////////////////////////////////////////
// Badges
////////////////////////////////////////////////////////////////////////////////////

// get
server.get('/applications/:appid/badges', badges.findAll);
server.get('/applications/:appid/badges/:badgeid', badges.findById);

// post
server.post('/applications/:appid/badges', badges.create);

// put
server.put('/applications/:appid/badges/:badgeid', badges.update);

////////////////////////////////////////////////////////////////////////////////////
// Badge Categories
////////////////////////////////////////////////////////////////////////////////////

// get
server.get('/applications/:appid/badges/categories', badge_cats.findAll);
server.get('/applications/:appid/badges/categories/:categoryid', badge_cats.findById);

// post
server.post('/applications/:appid/badges/categories/', badge_cats.create);

// put
server.put('/applications/:appid/badges/categories/:categoryid', badge_cats.update);

////////////////////////////////////////////////////////////////////////////////////
// Trick for CORS... needed for angular
////////////////////////////////////////////////////////////////////////////////////

// Response to an unknow MethodHandler
// Validation scheme for CORS request: http://www.html5rocks.com/static/images/cors_server_flowchart.png
// Based on : https://github.com/mcavage/node-restify/issues/284
function unknownMethodHandler(req, res) {
	if (req.method.toLowerCase() === 'options') {
		//Angular.js send a x-resquested-with. The following line verify if the header is correct
		var allowHeaders = ['Accept', 'Accept-Version', 'Content-Type', 'Api-Version', 'x-requested-with'];

		if (res.methods.indexOf('OPTIONS') === -1) {
			res.methods.push('OPTIONS');
		}

		res.header('Access-Control-Allow-Credentials', true);
		res.header('Access-Control-Allow-Origin', req.headers.origin);
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		res.header('Access-Control-Allow-Headers', allowHeaders.join(', '));
		//response with "204 No content"
		return res.send(204);
	}
	else {
		return res.send(new restify.MethodNotAllowedError());
	}
}

server.on('MethodNotAllowed', unknownMethodHandler);
