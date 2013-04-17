////////////////////////////////////////////////////////////////////////////////////
////// Badge categories
////////////////////////////////////////////////////////////////////////////////////
'use strict';

// will be set by the controller using rewire
var db,
		msg_fact;

exports.findAll = function (req, res/*, next*/) {
	res.send(db.findAllBadgeCategories());
};

exports.findById = function (req, res/*, next*/) {
	var categoryid = req.params.categoryid;
	res.send(db.findBadgeCategoryById(categoryid));
};

exports.create = function (req, res/*, next*/) {
	var categoryid, name, payload;

	name = req.params.name;

	categoryid = db.createBadgeCategory(name);

	payload = { category_id: categoryid };

	res.send(msg_fact.success("Successfully added.", payload));
};

exports.update = function (req, res/*, next*/) {
	var categoryid, name;

	categoryid = req.params.category_id;
	name = req.params.name;

	db.updateBadgeCategory(categoryid, name);

	res.send(msg_fact.success("Badge category has been updated.", ""));
};
