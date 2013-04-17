'use strict';

// apieasy usage : http://blog.nodejitsu.com/rest-easy-test-any-api-in-nodejs

require('../lib/gitification.js');

var APIeasy = require('api-easy');
//assert = require('assert');




var suite = APIeasy.describe('badgecategories');

suite.discuss('When asking our API')
	//// GET ////
	.discuss('to send us')
		.discuss('the list of badge categories')
			.use('localhost', 8080)
			.setHeader('Content-Type', 'application/json')
			.get('applications/1/badges/categories')
			.expect(200)
			.undiscuss()
		.discuss('a specific badge category')
			.use('localhost', 8080)
			.setHeader('Content-Type', 'application/json')
			.get('applications/1/badges/categories/1')
			.expect(200)
			.undiscuss()
/*
		.discuss('a specific badge category with a string as id')
			.use('localhost', 8080)
			.setHeader('Content-Type', 'application/json')
			.get('applications/1/badges/categories/asdf')
			.expect(400)
			.undiscuss()
		.undiscuss()
	//// POST ////
	.discuss('to save a new badge category')
		.discuss('with valid parameters')
			.use('localhost', 8080)
			.setHeader('Content-Type', 'application/json')
			.post('applications/1/badges/categories/', {name: 'cat name'})
			.expect(201)// TODO add content...
			.undiscuss()
		.discuss('with not all required parameters')
			.use('localhost', 8080)
			.setHeader('Content-Type', 'application/json')
			.post('applications/1/badges/categories/')
			.expect(400)
			.undiscuss()
		.undiscuss()
	//// PUT ////
	.discuss('to update a badge category')
		.discuss('with valid parameters')
			.use('localhost', 8080)
			.setHeader('Content-Type', 'application/json')
			.put('applications/1/badges/categories/1', {name: 'newname'})
			.undiscuss()
		.discuss('with not all parameters')
			.use('localhost', 8080)
			.setHeader('Content-Type', 'application/json')
			.put('applications/1/badges/categories/1')
			.expect(400)
			.undiscuss()
		.undiscuss()
*/
	.export(module);

