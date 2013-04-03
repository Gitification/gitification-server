////////////////////////////////////////////////////////////////////////////////////
////// Rules
////////////////////////////////////////////////////////////////////////////////////
'use strict';

exports.findAll = function (req, res/*, next*/ ) {
	res.send([
		{
			rule_id: 1,
			name: "sample rule",
			badge: 1,
			event_types:
			[
				{
					event_type: 1,
					threshold: 10
				}
			]
		}
	]);
};

exports.findById = function (req, res/*, next*/ ) {
	var ruleid = req.params.ruleid;

	res.send({
		rule_id: ruleid,
		name: "sample rule",
		badge: 1,
		event_types:
		[
			{
				event_type: 1,
				threshold: 10
			}
		]
	});
};

exports.create = function (req, res/*, next*/ ) {

	res.send({
		code: "success",
		message: "Successfully added",
		payload:
		{
			rule_id: 1,
		}
	});
};

exports.update = function (req, res/*, next*/ ) {
	//var ruleid = req.params.ruleid;

	res.send({
		code: "success",
		message: "Rule has been updated."
	});
};

exports.remove = function (req, res/*, next*/ ) {
	//var ruleid = req.params.ruleid;
	
	res.send({
		code: "success",
		message: "Rule has been deleted."
	});
};
