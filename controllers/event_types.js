////////////////////////////////////////////////////////////////////////////////////
////// Event types
////////////////////////////////////////////////////////////////////////////////////
'use strict';

exports.findAll = function (req, res/*, next*/ ) {
	res.send([
		{
			type_id: 1,
			name: "commits"
		}
	]);
};

exports.findById = function (req, res/*, next*/ ) {
	var event_type_id = req.params.userid;

	res.send({
		user:
		{
			type_id: event_type_id,
			name: "commits"
		}
	});
};

exports.create = function (req, res/*, next*/ ) {

	res.send({
		code: "success",
		message: "Successfully added",
		payload:
		{
			event_type_id: 1
		}
	});
};
