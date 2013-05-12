'use strict';

// apieasy usage : http://blog.nodejitsu.com/rest-easy-test-any-api-in-nodejs

var server = require('../lib/gitification.js');

var APIeasy = require('api-easy');
//assert = require('assert');

var suite = APIeasy.describe('applications');

suite.discuss('When asking our API')
	.discuss('to send us')
		.discuss('the list of applications')
			.use('localhost', 8080)
			.setHeader('Content-Type', 'application/json')
			.get(server.prefix + '/applications/')
			.expect(200)
			.undiscuss()
		.discuss('a specific application')
			.use('localhost', 8080)
			.setHeader('Content-Type', 'application/json')
			.get(server.prefix + '/applications/1')
			.expect(200)
			.undiscuss()
		.discuss('a specific application with a string as id')
			.use('localhost', 8080)
			.setHeader('Content-Type', 'application/json')
			.get(server.prefix + '/applications/asdf')
			.expect(200)
			.undiscuss()
		.undiscuss()
	//// POST ////
	.discuss('to save a new application')
		.discuss('with valid parameters')
			.use('localhost', 8080)
			.setHeader('Content-Type', 'application/json')
			.post(server.prefix + '/applications/', {site: 'http://app.com',
															callback: 'http://calbackurl.com',
															admin: 'admin@cat.com'})
			.expect(201)// TODO add content...
			.undiscuss()
		.discuss('with not all required parameters')
			.use('localhost', 8080)
			.setHeader('Content-Type', 'application/json')
			.post(server.prefix + '/applications/', {site: 'app site',
															callback: 'http://calbackurl'})
			.expect(400)
			.undiscuss()
		.undiscuss()
	.export(module);
