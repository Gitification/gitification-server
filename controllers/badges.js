////////////////////////////////////////////////////////////////////////////////////
////// Badges
////////////////////////////////////////////////////////////////////////////////////
'use strict';

exports.findAll = function (req, res/*, next*/ ) {
	res.send([
		{
			badge_id: 1,
			category_id: 1,
			name: "badge name",
			icon: "path/to/icon.png"
		}
	]);
};

exports.findById = function (req, res/*, next*/ ) {
	var badgeid = req.params.badgeid;

	res.send({
		badge_id: badgeid,
		category_id: 1,
		name: "badge name",
		icon: "path/to/icon.png"
	});
};

exports.create = function (req, res/*, next*/ ) {
	res.send({
		code: "success",
		message: "Badge successfully registered.",
		payload:
		{
			badge_id: 1
		}
	});
};

exports.update = function (req, res/*, next*/ ) {
	//var ruleid = req.params.ruleid;

	res.send({
		code: "success",
		message: "Badge has been updated."
	});
};
