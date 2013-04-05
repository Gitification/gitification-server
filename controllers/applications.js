////////////////////////////////////////////////////////////////////////////////////
//// Applications
////////////////////////////////////////////////////////////////////////////////////
'use strict';

// will be set by the controller using rewire
var db,
		msg_fact;

exports.findAll = function (req, res/*, next*/) {
	var qres;

	qres = db.findAllApplications();

	res.send(qres);
};

exports.findById = function (req, res/*, next*/) {
	var appid, qres;

	appid = req.params.appid;
	qres = db.findApplicationById(appid);
	res.send(qres);
};

exports.create = function (req, res/*, next*/) {
	var payload;

	payload = {api_key: "api-key", secret_key: "api-secret-key"};
	res.send(msg_fact.success("Successfully registered.", payload));
};
