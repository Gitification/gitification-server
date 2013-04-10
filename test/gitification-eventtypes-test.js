'use strict';

// apieasy usage : http://blog.nodejitsu.com/rest-easy-test-any-api-in-nodejs

require('../lib/gitification.js');

var APIeasy = require('api-easy');
//assert = require('assert');




var suite = APIeasy.describe('eventtypes');

suite.discuss('When asking our API')
  .discuss('to send us the list of available event types')
    .use('localhost', 8080)
    .setHeader('Content-Type', 'application/json')
    .get('applications/1/events/types')
    .expect(200)
    .export(module);
