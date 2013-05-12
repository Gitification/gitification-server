'use strict';

// apieasy usage : http://blog.nodejitsu.com/rest-easy-test-any-api-in-nodejs

var server = require('../lib/gitification.js');

var APIeasy = require('api-easy');

var suite = APIeasy.describe('badges');

suite.discuss('When asking our API')
	//// GET ////
	.discuss('to send us')
		.discuss('the list of badges')
			.use('localhost', 8080)
			.setHeader('Content-Type', 'application/json')
			.get(server.prefix + '/applications/1/badges')
			.expect(200)
			.undiscuss()
		.discuss('a specific badge')
			.use('localhost', 8080)
			.setHeader('Content-Type', 'application/json')
			.get(server.prefix + '/applications/1/badges/1')
			.expect(200)
			.undiscuss()

		.discuss('a specific badge but with invalid id')
			.use('localhost', 8080)
			.setHeader('Content-Type', 'application/json')
			.get(server.prefix + '/applications/1/badges/asdf')
			.expect(200)
			.undiscuss()
		.undiscuss()
	//// POST ////
	.discuss('to save a new badge')
		.discuss('with valid parameters')
			.use('localhost', 8080)
			.setHeader('Content-Type', 'application/json')
			.post(server.prefix + '/applications/1/badges/', {	name: 'badgename',
																				icon: 'http://badgeurl.url',
																				category_id: '1'})
			.expect(201)// TODO add content...
			.undiscuss()
		.discuss('with not all required parameters')
			.use('localhost', 8080)
			.setHeader('Content-Type', 'application/json')
			.post(server.prefix + '/applications/1/badges/', {	name: 'badgename',
																				category_id: '1'})
			.expect(400)
			.undiscuss()
		.discuss('with alphanum category_id value')
			.use('localhost', 8080)
			.setHeader('Content-Type', 'application/json')
			.post(server.prefix + '/applications/1/badges/', {	name: 'badgename',
																				icon: 'http://badgeurl.url',
																				category_id: 'asdf'})
			.expect(201)
			.undiscuss()
		.undiscuss()
	//// PUT ////
	.discuss('to update a badge')
		.discuss('with valid parameters')
			.use('localhost', 8080)
			.setHeader('Content-Type', 'application/json')
			.put(server.prefix + '/applications/1/badges/1', {	name: 'newbadgename',
																				icon: 'http://badgeurl.url',
																				category_id: '1'})
			.expect(200,
	{
		code: 'success',
		message: 'Badge was updated.',
		payload: {
			name: 'newbadgename',
			icon: 'http://badgeurl.url',
			category_id: 1,
			badge_id: 1,
			application_id: 1
		}
	}
			)
			.undiscuss()
		.discuss('with not all parameters')
			.use('localhost', 8080)
			.setHeader('Content-Type', 'application/json')
			.put(server.prefix + '/applications/1/badges/1',	{name: 'newbadgename',
																				icon: 'http://badgeurl.url'})
			.expect(400)
			.undiscuss()
		.discuss('with alphanum category_id')
			.use('localhost', 8080)
			.setHeader('Content-Type', 'application/json')
			.put(server.prefix + '/applications/1/badges/1',	{name: 'newbadgename',
																				icon: 'http://badgeurl.url',
																				category_id: 'asdf'})
			.expect(200)
			.undiscuss()
		.undiscuss()
	.export(module);
