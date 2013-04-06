////////////////////////////////////////////////////////////////////////////////////
////// Badges
////////////////////////////////////////////////////////////////////////////////////
'use strict';

// will be set by the controller using rewire
var db,
		msg_fact;

exports.findAll = function (req, res/*, next*/ ) {
	res.send(db.findAllBadges());
};

exports.findById = function (req, res/*, next*/ ) {
	var badgeid = req.params.badgeid;

	res.send(db.findBadgeById(badgeid));
};

exports.create = function (req, res/*, next*/ ) {
	var badgeid, name, icon, category_id, payload;

	name = req.params.name;
	icon = req.params.icon;
	category_id = req.params.category_id;

	badgeid = db.createBadge(name, icon, category_id);

	payload = {	badge_id: badgeid };

	res.send(msg_fact.success("Successfully added.", payload));
};

exports.update = function (req, res/*, next*/ ) {
	var badgeid, name, icon, category_id;

	badgeid = req.params.badge_id;
	name = req.params.name;
	icon = req.params.icon;
	category_id = req.params.category_id;

	db.updateBadge(badgeid, name, icon, category_id);

	res.send(msg_fact.success("Badge has been updated.", ""));
};
