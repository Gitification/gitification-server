'use strict';

var http = require('http');

function http_post(path, json_body) {
	var request, body;

	body = JSON.stringify(json_body);

	request = new http.ClientRequest({
		hostname: "localhost",
		port: 8080,
		path: path,
		method: "POST",
		headers: {
				"Content-Type": "application/json",
				"Content-Length": body.length
			}
		});

	request.end(body);


	request.on('response', function (response) {
		// if not created display received message
		//if (response.statusCode !== 201) {
		console.log('STATUS: ' + response.statusCode);
		//console.log('HEADERS: ' + JSON.stringify(response.headers));
		response.setEncoding('utf8');
		response.on('data', function (chunk) {
			console.log('BODY: ' + chunk);
		});
		//}
	});
}


exports.createApplication = function (req) {
	http_post('/applications', req);
};

exports.createUser = function (appid, req) {
	http_post('/applications/' + appid + '/users', req);
};

exports.createEvent = function (appid, req) {
	http_post('/applications/' + appid + '/events', req);
};

exports.createEventType = function (appid, req) {
	http_post('/applications/' + appid + '/events/types', req);
};

exports.createRule = function (appid, req) {
	http_post('/applications/' + appid + '/rules', req);
};

exports.createBadge = function (appid, req) {
	http_post('/applications/' + appid + '/badges', req);
};

exports.createBadgeCategory = function (appid, req) {
	http_post('/applications/' + appid + '/badges/categories', req);
};
