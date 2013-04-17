'use strict';

// apieasy usage : http://blog.nodejitsu.com/rest-easy-test-any-api-in-nodejs

require('../lib/gitification.js');

var APIeasy = require('api-easy');
//assert = require('assert');


//////////////////////////////
// TODO tests
//	* add messages in replies
//////////////////////////////


var suite = APIeasy.describe('rules');

suite.discuss('When asking our API')
  //// GET ////
  .discuss('to send us')
		.discuss('the list of rules')
			.use('localhost', 8080)
			.setHeader('Content-Type', 'application/json')
			.get('applications/1/rules')
			.expect(200)
			.undiscuss()
		.discuss('the details of an existing rule')
			.use('localhost', 8080)
			.setHeader('Content-Type', 'application/json')
			.get('applications/1/rules/1')
			.expect(200)
			.undiscuss()
/*
		.discuss('the details of a rule with string as id')
			.use('localhost', 8080)
			.setHeader('Content-Type', 'application/json')
			.get('applications/1/rules/asdf')
			.expect(400)
			.undiscuss()
		.undiscuss()
  //// POST ////
  .discuss('to save a new rule')
     .discuss('with valid parameters')
      .use('localhost', 8080)
      .setHeader('Content-Type', 'application/json')
      .post('applications/1/rules/', {name: 'rulename',
																			badge: '1',
																			event_types:
																				[{event_type: '1',
																					threshold: '100'}
																				]
																			})
      .expect(201)
    .discuss('with no event type')
      .use('localhost', 8080)
      .setHeader('Content-Type', 'application/json')
      .post('applications/1/rules/', {name: 'rulename',
																			badge: '1'})
      .expect(400)
      .undiscuss()
    .discuss('with badge as string instead of oid')
      .use('localhost', 8080)
      .setHeader('Content-Type', 'application/json')
      .post('applications/1/rules/', {name: 'rulename',
																			badge: 'asdf',
																			event_types:
																				[{event_type: '1',
																					threshold: '100'}
																				]
																			})
      .expect(400)
      .undiscuss()
    .undiscuss()
  //// PUT ////
  .discuss('to update a rule')
    .discuss('with valid parameters')
			.use('localhost', 8080)
			.setHeader('Content-Type', 'application/json')
			.put('applications/1/rules/1', {name: 'test',
																			badge: '1',
																			event_types:
																				[{event_type: '1',
																					threshold: '100'}
																				]
																			})
			.expect(200)
			.undiscuss()
		.discuss('with missing badge type')
			.use('localhost', 8080)
			.setHeader('Content-Type', 'application/json')
			.put('applications/1/users/', {	name: 'test',
																			event_types:
																				[{event_type: '1',
																					threshold: '100'}
																				]
																			})
			.expect(400)
			.undiscuss()
		.undiscuss()
	//// DELETE ////
	.discuss('to delete a rule')
		.discuss('with valid parameter')
			.use('localhost', 8080)
			.setHeader('Content-Type', 'application/json')
			.del('applications/1/rules/1')
			.expect(200)
			.undiscuss()
		.discuss('with string as id instead of integer')
			.use('localhost', 8080)
			.setHeader('Content-Type', 'application/json')
			.del('applications/1/rules/asdf')
			.expect(400)
			.undiscuss()
		.undiscuss()
*/
  .export(module);
