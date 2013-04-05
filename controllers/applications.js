////////////////////////////////////////////////////////////////////////////////////
//// Applications
////////////////////////////////////////////////////////////////////////////////////
'use strict';

// our database, will be set by the controller using rewire
var db;

// a message factory, will be set by the controller using rewire
var msg_fact;

var response = function (res) {
	return {
		send: function (result) {
			res.send(result);
		},
		error: function (err) {
			res.send(err);
		}
	};
};


exports.findAll = function (req, res/*, next*/) {
	db.findAllApplications(response(res));
};

exports.findById = function (req, res/*, next*/) {
	var appid, qres;
	
	appid = req.params.appid;
	qres = db.findApplicationById(appid);
	res.send(qres);
};

exports.create = function (req, res/*, next*/) {
	var payload;
	
	payload = db.createApplication(req.params.site, req.params.callback, req.params.admin);
	res.send(msg_fact.success("Successfully registered.", payload));
};
