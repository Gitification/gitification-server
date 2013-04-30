////////////////////////////////////////////////////////////////////////////////////
////// Badges
////////////////////////////////////////////////////////////////////////////////////
'use strict';

// DI
var db,
	responseHandler;

/**
 *
 * @param req the HTTP requests, contains header and body parameters
 * @param res the callback to which send HTTP response
 * @param next facilitate restify function chaining
 */
exports.findAll = function (req, res, next) {
	req.check('appid', '"appid": must be a valid identifier').isInt();
	var errors = req.validationErrors(),
		appid;
	if (errors) {
		responseHandler(res).error(400, errors);
		return;
	}

	appid = req.params.appid;
	db.findAllBadges({'application_id': appid}, responseHandler(res, next));
};

/**
 *
 * @param req the HTTP requests, contains header and body parameters
 * @param res the callback to which send HTTP response
 * @param next facilitate restify function chaining
 */
exports.findById = function (req, res, next) {
	req.check('appid', '"appid": must be a valid identifier').isInt();
	req.check('badgeid', '"badgeid": must be a valid identifier').isInt();
	var errors = req.validationErrors(),
		appid,
		badgeid;
	if (errors) {
		responseHandler(res).error(400, errors);
		return;
	}

	appid = req.params.appid;
	badgeid = req.params.badgeid;
	db.findBadgeById({'application_id': appid, 'badge_id': badgeid}, responseHandler(res, next));
};

/**
 *
 * @param req the HTTP requests, contains header and body parameters
 * @param res the callback to which send HTTP response
 * @param next facilitate restify function chaining
 */
exports.create = function (req, res, next) {
	req.check('appid', '"appid": must be a valid identifier').isInt();
	req.check('name', '"name": must be a valid string').notNull();
	req.check('icon', '"icon": must be a valid URL').isUrl();
	req.check('category_id', '"category_id": must be a valid identifier').isInt();
	var errors = req.validationErrors(),
		appid,
		name,
		icon,
		categoryid;
	if (errors) {
		responseHandler(res).error(400, errors);
		return;
	}

	appid = req.params.appid;
	name = req.params.name;
	icon = req.params.icon;
	categoryid = req.params.category_id;
	db.createBadge(
		{'application_id': appid, 'name': name, 'icon': icon, 'category_id': categoryid},
		responseHandler(res, next)
	);
};

/**
 *
 * @param req the HTTP requests, contains header and body parameters
 * @param res the callback to which send HTTP response
 * @param next facilitate restify function chaining
 */
exports.update = function (req, res, next) {
	req.check('appid', '"appid": must be a valid identifier').isInt();
	req.check('badgeid', '"badgeid": must be a valid identifier').isInt();
	req.check('name', '"name": must be a valid string').notNull();
	req.check('icon', '"icon": must be a valid URL').isUrl();
	req.check('category_id', '"category_id": must be a valid identifier').isInt();
	var errors = req.validationErrors(),
		appid,
		badgeid,
		name,
		icon,
		categoryid;
	if (errors) {
		responseHandler(res).error(400, errors);
		return;
	}

	appid = req.params.appid;
	badgeid = req.params.badgeid;
	name = req.params.name;
	icon = req.params.icon;
	categoryid = req.params.category_id;
	db.updateBadge(
		{'application_id': appid, 'badge_id': badgeid, 'name': name, 'icon': icon, 'category_id': categoryid},
		responseHandler(res, next)
	);
};
