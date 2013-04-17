'use strict';

// apieasy usage : http://blog.nodejitsu.com/rest-easy-test-any-api-in-nodejs

require('../lib/gitification.js');

var APIeasy = require('api-easy');
//assert = require('assert');




var suite = APIeasy.describe('applications');

suite.discuss('When asking our API')
	.discuss('to send us')
		.discuss('the list of applications')
			.use('localhost', 8080)
			.setHeader('Content-Type', 'application/json')
			.get('applications/')
			.expect(200)
			.undiscuss()
		.discuss('a specific application')
			.use('localhost', 8080)
			.setHeader('Content-Type', 'application/json')
			.get('applications/1')
			.expect(200)
			.undiscuss()
/*
		.discuss('a specific application with a string as id')
			.use('localhost', 8080)
			.setHeader('Content-Type', 'application/json')
			.get('applications/asdf')
			.expect(400)
			.undiscuss()
		.undiscuss()
	//// POST ////
	.discuss('to save a new application')
		.discuss('with valid parameters')
			.use('localhost', 8080)
			.setHeader('Content-Type', 'application/json')
			.post('applications/', {site: 'app site',
															callback: 'http://calbackurl',
															admin: 'admin string'})
			.expect(201)// TODO add content...
			.undiscuss()
		.discuss('with not all required parameters')
			.use('localhost', 8080)
			.setHeader('Content-Type', 'application/json')
			.post('applications/', {site: 'app site',
															callback: 'http://calbackurl'})
			.expect(400)
			.undiscuss()
		.undiscuss()
*/
	.export(module);
