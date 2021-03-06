'use strict';

// apieasy usage : http://blog.nodejitsu.com/rest-easy-test-any-api-in-nodejs

var server = require('../lib/gitification.js');

var APIeasy = require('api-easy');
//assert = require('assert');

var suite = APIeasy.describe('events');

suite.discuss('When asking our API')
	//// GET ////
  .discuss('to send us')
		.discuss('the list of events')
			.use('localhost', 8080)
			.setHeader('Content-Type', 'application/json')
			.get(server.prefix + '/applications/1/events')
			.expect(200)
			.undiscuss()
		.discuss('a specific event')
			.use('localhost', 8080)
			.setHeader('Content-Type', 'application/json')
			.get(server.prefix + '/applications/1/events/1')
			.expect(200)
			.undiscuss()
		.discuss('a specific event but with invalid id value')
			.use('localhost', 8080)
			.setHeader('Content-Type', 'application/json')
			.get(server.prefix + '/applications/1/events/asdf')
			.expect(200)
			.undiscuss()
		.undiscuss()
	//// POST ////
	.discuss('to save a new event')
    .discuss('with valid parameters')
      .use('localhost', 8080)
      .setHeader('Content-Type', 'application/json')
      .post(server.prefix + '/applications/1/events', {type: 1,
																			user: 2,
																			issued: '04-22-2013'})
      .expect(201)// TODO add content...
      .undiscuss()
    .discuss('with not all required parameters')
      .use('localhost', 8080)
      .setHeader('Content-Type', 'application/json')
      .post(server.prefix + '/applications/1/events', {type: '1'})
      .expect(400)
      .undiscuss()
    .discuss('with alphanum id')
      .use('localhost', 8080)
      .setHeader('Content-Type', 'application/json')
      .post(server.prefix + '/applications/1/events', {type: '1',
																			user: 'asdf',
																			issued: '04-22-2013'})
      .expect(201)
      .undiscuss()
    .undiscuss()
	.undiscuss()
	.export(module);

