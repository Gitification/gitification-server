////////////////////////////////////////////////////////////////////////////////////
//// Applications
////////////////////////////////////////////////////////////////////////////////////
'use strict';

exports.findAll = function (req, res/*, next*/) {
	res.send([
		{
			application_id: 1,
			site: "sample",
			callback: "callback",
			created_at: "20130327",
			admin: "admin",
			statistics:
			{
				user_count: 1,
				event_count: 1,
				badge_count: 1,
				rule_count: 1
			}
		}
	]);
};

exports.findById = function (req, res/*, next*/) {
	res.send({
		application_id: req.params.appid,
		site: "sample",
		callback: "callback",
		created_at: "20130327",
		admin: "admin",
		statistics:
		{
			user_count: 1,
			event_count: 1,
			badge_count: 1,
			rule_count: 1
		}
	});
};

// TODO temp
var msg_fact = require('./../helpers/reply_message_factory');

exports.create = function (req, res/*, next*/) {
	var payload = {api_key: "api-key", secret_key: "api-secret-key"};
	res.send(msg_fact.success("Successfully registered.", payload));
};
