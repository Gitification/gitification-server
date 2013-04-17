'use strict';

// apieasy usage : http://blog.nodejitsu.com/rest-easy-test-any-api-in-nodejs

require('../lib/gitification.js');

var APIeasy = require('api-easy');
//assert = require('assert');

//////////////////////////////
// TODO tests
//	* delete non-existing
//	* update non-existing
//	* get badges
//	* add messages in replies
//////////////////////////////

var suite = APIeasy.describe('users');

suite.discuss('When asking our API')
	//// GET ////
	.discuss('to send us')
		.discuss('the list of users')
			.use('localhost', 8080)
			.setHeader('Content-Type', 'application/json')
			.get('applications/1/users/')
			.expect(200)
			.undiscuss()
		.discuss('the details of an existing user')
			.use('localhost', 8080)
			.setHeader('Content-Type', 'application/json')
			.get('applications/1/users/1')
			.expect(200)
			.undiscuss()
/*
		.discuss('the details of a user with string as id')
			.use('localhost', 8080)
			.setHeader('Content-Type', 'application/json')
			.get('applications/1/users/asdf')
			.expect(400)
			.undiscuss()
		.undiscuss()
	//// POST ////
	.discuss('to save a new user')
		.discuss('with valid parameters')
			.use('localhost', 8080)
			.setHeader('Content-Type', 'application/json')
			.post('applications/1/users/', {login: 'testlogin',
																			firstname: 'testfirstname',
																			lastname: 'testlastname',
																			email: 'testemail'})
			.expect(201)// TODO add content...
			.undiscuss()
		.discuss('with not all required parameters')
			.use('localhost', 8080)
			.setHeader('Content-Type', 'application/json')
			.post('applications/1/users/', {login: 'test'})
			.expect(400)
			.undiscuss()
		.undiscuss()
	//// PUT ////
	.discuss('to update a user')
		.discuss('with valid parameters')
			.use('localhost', 8080)
			.setHeader('Content-Type', 'application/json')
			.put('applications/1/users/1', {login: 'testlogin',
																			firstname: 'testfirstname',
																			lastname: 'testlastname',
																			email: 'testemail'})
			.expect(200, { code: 'success', message: 'User was updated.' })
			.undiscuss()
		.discuss('with not all parameters')
			.use('localhost', 8080)
			.setHeader('Content-Type', 'application/json')
			.put('applications/1/users/1', {login: 'test',
																			firstname: 'testfirstname'})
			.expect(400)
			.undiscuss()
		.undiscuss()
	//// DELETE ////
	.discuss('to delete a user')
		.discuss('with valid parameter')
			.use('localhost', 8080)
			.setHeader('Content-Type', 'application/json')
			.del('applications/1/users/1')
			.expect(200)
			.undiscuss()
		.discuss('with string as id instead of integer')
			.use('localhost', 8080)
			.setHeader('Content-Type', 'application/json')
			.del('applications/1/users/asdf')
			.expect(400)
			.undiscuss()
		.undiscuss()
*/
	.export(module);
