////////////////////////////////////////////////////////////////////////////////////
////// Rules
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
	req.check('appid', '"appid": must be a valid identifier').notNull();
	var errors = req.validationErrors(),
		appid;
	if (errors) {
		responseHandler(res).error(400, errors);
		return;
	}

	appid = req.params.appid;
	db.findAllRules({'application_id': appid}, responseHandler(res, next));
};

/**
 *
 * @param req the HTTP requests, contains header and body parameters
 * @param res the callback to which send HTTP response
 * @param next facilitate restify function chaining
 */
exports.findById = function (req, res, next) {
	req.check('appid', '"appid": must be a valid identifier').notNull();
	req.check('ruleid', '"ruleid": must be a valid identifier').notNull();
	var errors = req.validationErrors(),
		appid,
		ruleid;
	if (errors) {
		responseHandler(res).error(400, errors);
		return;
	}

	appid = req.params.appid;
	ruleid = req.params.ruleid;
	db.findRuleById({'application_id': appid, 'rule_id': ruleid}, responseHandler(res, next));
};

/**
 *
 * @param req the HTTP requests, contains header and body parameters
 * @param res the callback to which send HTTP response
 * @param next facilitate restify function chaining
 */
exports.create = function (req, res, next) {
	req.check('appid', '"appid": must be a valid identifier').notNull();
	req.check('name', '"name": must be a valid string').notNull();
	req.check('badge_id', '"badge_id": must be a valid identifier').notNull();
	req.check('event_types', '"event_types": must not be empty').notNull(); // TODO: Correctly parse each element!
	var errors = req.validationErrors(),
		appid,
		name,
		badge,
		event_types;
	if (errors) {
		responseHandler(res).error(400, errors);
		return;
	}

	appid = req.params.appid;
	name = req.params.name;
	badge = req.params.badge_id;
	event_types = req.params.event_types;
	db.createRule(
		{'application_id': appid, 'name': name, 'badge_id': badge, 'event_types': event_types},
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
	req.check('appid', '"appid": must be a valid identifier').notNull();
	req.check('ruleid', '"ruleid": must be a valid identifier').notNull();
	req.check('name', '"name": must be a valid string').notNull();
	req.check('badge_id', '"badge_id": must be a valid identifier').notNull();
	req.check('event_types', '"event_types": must be an array').notNull(); // TODO: Correctly parse each element!
	var errors = req.validationErrors(),
		appid,
		ruleid,
		name,
		badge,
		event_types;
	if (errors) {
		responseHandler(res).error(400, errors);
		return;
	}

	appid = req.params.appid;
	ruleid = req.params.ruleid;
	name = req.params.name;
	badge = req.params.badge_id;
	event_types = req.params.event_types;
	db.updateRule(
		{'application_id': appid, 'rule_id': ruleid, 'name': name, 'badge_id': badge, 'event_types': event_types},
		responseHandler(res, next)
	);
};

/**
 *
 * @param req the HTTP requests, contains header and body parameters
 * @param res the callback to which send HTTP response
 * @param next facilitate restify function chaining
 */
exports.remove = function (req, res, next) {
	req.check('appid', '"appid": must be a valid identifier').notNull();
	req.check('ruleid', '"ruleid": must be a valid identifier').notNull();
	var errors = req.validationErrors(),
		appid,
		ruleid;
	if (errors) {
		responseHandler(res).error(400, errors);
		return;
	}

	appid = req.params.appid;
	ruleid = req.params.ruleid;
	db.deleteRule({'application_id': appid, 'rule_id': ruleid}, responseHandler(res, next));
};
