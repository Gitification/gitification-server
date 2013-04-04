////////////////////////////////////////////////////////////////////////////////////
////// Rules
////////////////////////////////////////////////////////////////////////////////////
'use strict';

// our database, will be set by the controller using rewire
var db;

// a message factory, will be set by the controller using rewire
var msg_fact;


exports.findAll = function (req, res/*, next*/ ) {
	res.send(db.findAllRules());
};


exports.findById = function (req, res/*, next*/ ) {
	var ruleid = req.params.ruleid;

	res.send(db.findRuleById(ruleid));
};


exports.create = function (req, res/*, next*/ ) {
	var ruleid, name, badge, event_types, payload;

	name = req.params.name;
	badge = req.params.badge;
	event_types = req.params.event_types; // TODO array of event types....

	ruleid = db.createRule(name, badge, event_types);

	payload = { rule_id: ruleid };
	
	res.send(msg_fact.success("Successfully added.", payload));
};

exports.update = function (req, res/*, next*/ ) {
	var ruleid, name, badge, event_types;
	
	ruleid = req.params.rule_id;
	name = req.params.name;
	badge = req.params.badge;
	event_types = req.params.event_types; // TODO array of event types....

	db.updateRule(ruleid, name, badge, event_types);
	
	res.send(msg_fact.success("Rule has been updated.", ""));
};

exports.remove = function (req, res/*, next*/ ) {
	var ruleid = req.params.ruleid;
	db.deleteRule(ruleid);
	
	res.send(msg_fact.success("Rule has been deleted.", ""));
};
