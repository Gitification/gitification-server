/**
 * Minimal server, based on http://mcavage.github.com/node-restify/
 * After node server.js, launch browser at http://localhost:8080/hello/blu
 */

'use strict';

var restify = require('restify');
var db = require('riak-js').getClient();


function respond(req, res/*, next*/) {
  res.send('hello ' + req.params.name);
}

function datareq(req, res/*, next*/) {
	var callback = function (err, result/*, meta*/) {
		res.send(result);
	};
	db.get('conference', 'nodeconf', callback);
}
function datapost(req, res/*, next*/) {
	console.log(req.params + "\n" + req.body);
	db.save('conference', 'nodeconf', {title: req.params.name});
	res.send("succes " + req.params.name);
}

var server = restify.createServer();
server.use(restify.bodyParser());

server.get('/hello', datareq);
server.post('/hello', datapost);
server.head('/hello/:name', respond);

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});
