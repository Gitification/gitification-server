////////////////////////////////////////////////////////////////////////////////////
////// Badge categories
////////////////////////////////////////////////////////////////////////////////////
'use strict';

exports.findAll = function (req, res/*, next*/) {
	res.send([
		{
			category_id: 1,
			name: "category name"
		}
	]);
};

exports.findById = function (req, res/*, next*/) {
	var categoryid = req.params.categoryid;

	res.send({
		category_id: categoryid,
		name: "category name"
	});
};

exports.create = function (req, res/*, next*/) {

	res.send({
		code: "success",
		message: "Category successfully registered.",
		payload:
		{
			category_id: 1
		}
	});
};

exports.update = function (req, res/*, next*/) {
	//var ruleid = req.params.ruleid;

	res.send({
		code: "success",
		message: "Badge category has been updated."
	});
};
