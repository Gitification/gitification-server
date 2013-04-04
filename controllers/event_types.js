////////////////////////////////////////////////////////////////////////////////////
////// Event types
////////////////////////////////////////////////////////////////////////////////////
'use strict';

// our database, will be set by the controller using rewire
var db;

// a message factory, will be set by the controller using rewire
var msg_fact;


exports.findAll = function (req, res/*, next*/ ) {
	res.send(db.findAllEventTypes());
};

exports.findById = function (req, res/*, next*/ ) {
	var eventtypeid = req.params.userid;

	res.send(db.findEventTypeById(eventtypeid));
};

exports.create = function (req, res/*, next*/ ) {
	var event_name, payload, eventtypeid;
	
	event_name = req.params.event_name;
	eventtypeid = db.createEventType(event_name);

	payload = { event_type_id: eventtypeid };
	res.send(msg_fact.success("Successfully added.", payload));
};
