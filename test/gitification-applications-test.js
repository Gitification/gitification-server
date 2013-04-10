'use strict';

// apieasy usage : http://blog.nodejitsu.com/rest-easy-test-any-api-in-nodejs

require('../lib/gitification.js');

var APIeasy = require('api-easy');
//assert = require('assert');




var suite = APIeasy.describe('applications');

suite.discuss('When asking our API')
  .discuss('to send us the list of applications')
    .use('localhost', 8080)
    .setHeader('Content-Type', 'application/json')
    .get('applications/')
    .expect(200)
    .export(module);
