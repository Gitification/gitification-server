'use strict';

// apieasy usage : http://blog.nodejitsu.com/rest-easy-test-any-api-in-nodejs

require('../lib/gitification.js');

var APIeasy = require('api-easy');
//assert = require('assert');




var suite = APIeasy.describe('users');

suite.discuss('When asking our API')
  .discuss('to send us the list of users')
    .use('localhost', 8080)
    .setHeader('Content-Type', 'application/json')
    .get('applications/1/users/')
    .expect(200)
    /*
    .undiscuss()
  .discuss('to save a new user')
    .discuss('with bad parameters')
      .use('localhost', 8080)
      .setHeader('Content-Type', 'application/json')
      .post('applications/1/users/', {login: 'test'})
      .expect(404)
      .undiscuss()
    .discuss('with valid parameters')
      .use('localhost', 8080)
      .setHeader('Content-Type', 'application/json')
      .post('applications/1/users/', {login: 'testlogin',
                                      firstname: 'testfirstname',
                                      lastname: 'testlastname',
                                      email: 'testemail'})
      .expect(201)// TODO add content...
      .undiscuss()
    .undiscuss()
  .discuss('to update a user')
    .discuss('with bad parameters')
    .use('localhost', 8080)
    .setHeader('Content-Type', 'application/json')
    .post('applications/1/users/', {login: 'test'})
    .expect(404)
    .undiscuss()
  .discuss('with valid parameters')
    .use('localhost', 8080)
    .setHeader('Content-Type', 'application/json')
    .post('applications/1/users/', {user_id: '1',
                                    login: 'testlogin',
                                    firstname: 'testfirstname',
                                    lastname: 'testlastname',
                                    email: 'testemail'})
    .expect(200, { code: 'success', message: 'User was updated.' })
    .undiscuss()
   */
  .export(module);

  // TODO continue with delete

  // TODO continue with userid

