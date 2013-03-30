'use strict';

var restify = require('restify');

var server = restify.createServer();

var applications = require('./../controllers/static/applications');
var leaderboard = require('./../controllers/static/leaderboard');
var users = require('./../controllers/static/users');

//var hdl = require('./default_handler'); // default handler


server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});


// TODO this is needed for your tests to pass.....
exports.awesome = function () {
	return 'awesome';
};



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
// server.put('/applications/:appid/users/:userid', putMessage);

// delete
// server.delete('/applications/:appid/users/:userid', deleteMessage);



////////////////////////////////////////////////////////////////////////////////////
// Events
////////////////////////////////////////////////////////////////////////////////////

// get
// server.get('/applications/:appid/events', hdl.getMessages);
// server.get('/applications/:appid/events/:eventid', hdl.getMessages);

// post
// server.post('/applications/:appid/events', hdl.postMessage);


////////////////////////////////////////////////////////////////////////////////////
// Event Types
////////////////////////////////////////////////////////////////////////////////////

// get
// server.get('/applications/:appid/events/types', hdl.getMessages);
// server.get('/applications/:appid/events/types/:typeid', hdl.getMessages);

// post
// server.post('/applications/:appid/events/types', hdl.postMessage);


////////////////////////////////////////////////////////////////////////////////////
// Rules
////////////////////////////////////////////////////////////////////////////////////

// get
// server.get('/applications/:appid/rules', hdl.getMessages);
// server.get('/applications/:appid/rules/:ruleid', hdl.getMessages);

// post
// server.post('/applications/:appid/rules', hdl.postMessage);

// put
// server.put('/applications/:appid/rules/:ruleid', putMessage);

// delete
// server.delete('/applications/:appid/rules/:ruleid', deleteMessage);

////////////////////////////////////////////////////////////////////////////////////
// Badges
////////////////////////////////////////////////////////////////////////////////////

// get
// server.get('/applications/:appid/badges', hdl.getMessages);
// server.get('/applications/:appid/badges/:badgeid', hdl.getMessages);

// post
// server.post('/applications/:appid/badges', hdl.postMessage);

// put
// server.put('/applications/:appid/badges/:badgeid', putMessage);


////////////////////////////////////////////////////////////////////////////////////
// Badge Categories
////////////////////////////////////////////////////////////////////////////////////

// get
// server.get('/applications/:appid/badges/categories', hdl.getMessages);
// TODO duplicate query in apiaryio server.get('/applications/:appid/badges', hdl.getMessages);

// post
// server.post('/applications/:appid/badges/categories/', hdl.postMessage);

// put
// server.put('/applications/:appid/badges/categories/:categoryid', putMessage);

