////////////////////////////////////////////////////////////////////////////////////
////// Events
////////////////////////////////////////////////////////////////////////////////////
'use strict';

// our database, will be set by the controller using rewire
var db;

// a message factory, will be set by the controller using rewire
var msg_fact;


exports.findAll = function (req, res/*, next*/ ) {
	res.send(db.findAllEvents());
};

exports.findById = function (req, res/*, next*/ ) {
	var eventid;
	
	eventid = req.params.eventid;

	res.send(db.findEventById(eventid));
};

exports.create = function (req, res/*, next*/ ) {
	var type, user, date, eventid, payload;

	type = req.params.type;
	user = req.params.user;
	date = req.params.date; // or "2013-02-26"; // TODO today or specified
	
	eventid = db.createEvent(type, user, date);
	payload = { "event_id": 1 };

	res.send(msg_fact.success("Successfully added.", payload));
};
