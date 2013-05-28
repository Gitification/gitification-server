# gitification-server [![Build Status](https://secure.travis-ci.org/Gitification/gitification-server.png?branch=master)](http://travis-ci.org/Gitification/gitification-server)

Gitification's project, server-side implementation. This software is for experimental usage only.

## Getting Started
Refer to [installation guide](https://github.com/Gitification/gitification/wiki/Installation) on the wiki to the installation procedure.

Once installed, you have two options to run the server
- `npm lib/gitification.js`
- `npm install -g forever` and then `forever lib/gitification.js`

To find more on `forever`, refer to to its [github page](https://github.com/nodejitsu/forever)

## Gamification engine
To find out more on the API scheme we implemented, refer to the [apiary documentation](http://docs.gitification.apiary.io/).

Our [database model](https://github.com/Gitification/gitification/wiki/Gitification-Model) can be found on the super project wiki. To create a new engine, follow [the guide](https://github.com/Gitification/gitification/wiki/How-to%3A-Gamification-setup) associated.

## Benchmarks and software metrics
Riak and MySQL versions have been created to test their performance. Refer to the analysis on our [documentation repository](https://github.com/Gitification/gitification-docs).

We gathered static information about the quality of our server implementation to manage its complexity using plato. Find the results on [documentation repository](https://github.com/Gitification/gitification-docs) as well.

## Technologies
We used several node modules to ease development :
* `shortid` to generate random id ([Github page](https://github.com/dylang/shortid))
* `riak-js` to connect and manage riak nosql ([Project page](http://riakjs.com/))
* `restify` to create a RESTful API ([Project page](http://mcavage.github.io/node-restify/))
* `rewire` to use dependency injection ([Github page](https://github.com/jhnns/rewire))
* `api-easy` to test our API ([Github page](https://github.com/flatiron/api-easy))
* `validator` to validate input ([Github page](https://github.com/chriso/node-validator) and [Gist for Restify](https://gist.github.com/chriso/752126))
* `async` to manage asynchronous functional mess ([Github page](https://github.com/caolan/async))
* `mysql` to connect and manage MySQL server ([Github page](https://github.com/felixge/node-mysql))
