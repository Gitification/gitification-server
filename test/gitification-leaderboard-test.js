'use strict';

// apieasy usage : http://blog.nodejitsu.com/rest-easy-test-any-api-in-nodejs

var server = require('../lib/gitification.js');

var APIeasy = require('api-easy');

var suite = APIeasy.describe('leaderboard');

suite.discuss('When asking our API')
  .discuss('to send us the leaderboard')
    .use('localhost', 8080)
    .setHeader('Content-Type', 'application/json')
    .get(server.prefix + '/applications/1/leaderboard')
    .expect(200)
    .export(module);
