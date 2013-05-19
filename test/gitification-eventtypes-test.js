'use strict';

// apieasy usage : http://blog.nodejitsu.com/rest-easy-test-any-api-in-nodejs

var server = require('../lib/gitification.js');

var APIeasy = require('api-easy');
//assert = require('assert');

//////////////////////////////
// TODO tests
//	* add messages in replies
//////////////////////////////


var suite = APIeasy.describe('eventtypes');

suite.discuss('When asking our API')
	//// GET ////
	.discuss('to send us')
		.discuss('the list of available event types')
			.use('localhost', 8080)
			.setHeader('Content-Type', 'application/json')
			.get(server.prefix + '/applications/1/events/types')
			.expect(200)
			.undiscuss()
		.discuss('a specific event type')
			.use('localhost', 8080)
			.setHeader('Content-Type', 'application/json')
			.get(server.prefix + '/applications/1/events/types/1')
			.expect(200)
			.undiscuss()
		.discuss('a specific event type but with invalid id value')
			.use('localhost', 8080)
			.setHeader('Content-Type', 'application/json')
			.get(server.prefix + '/applications/1/events/types/asdf')
			.expect(200)
			.undiscuss()
		.undiscuss()
	//// POST ////
	.discuss('to save a new event type')
    .discuss('with valid parameters')
      .use('localhost', 8080)
      .setHeader('Content-Type', 'application/json')
      .post(server.prefix + '/applications/1/events/types', {name: 'testlogin'})
      .expect(201)// TODO add content...
      .undiscuss()
    .discuss('with not all required parameters')
      .use('localhost', 8080)
      .setHeader('Content-Type', 'application/json')
      .post(server.prefix + '/applications/1/events/types')
      .expect(400)
      .undiscuss()
    .undiscuss()
	.undiscuss()
	//// POST ////
	.discuss('to update an event type')
		.use('localhost', 8080)
		.setHeader('Content-Type', 'application/json')
		.put(server.prefix + '/applications/1/events/types/1', {
	"application_id": "1",
	"name": "dblutype",
	"type_id": "1"
})
		.expect(200) // TODO add content
	.discuss('with not all parameters')
	.use('localhost', 8080)
		.setHeader('Content-Type', 'application/json')
		.put(server.prefix + '/applications/1/events/types/1', {
	"application_id": "1",
	"name": "dblutype"
})
		.expect(400) // TODO add content
	.undiscuss()
	.export(module);
