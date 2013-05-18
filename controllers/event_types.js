////////////////////////////////////////////////////////////////////////////////////
////// Event types
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
	db.findAllEventTypes({'application_id': appid}, responseHandler(res, next));
};

/**
 *
 * @param req the HTTP requests, contains header and body parameters
 * @param res the callback to which send HTTP response
 * @param next facilitate restify function chaining
 */
exports.findById = function (req, res, next) {
	req.check('appid', '"appid": must be a valid identifier').notNull();
	req.check('typeid', '"typeid": must be a valid identifier').notNull();
	var errors = req.validationErrors(),
		appid,
		typeid;
	if (errors) {
		responseHandler(res).error(400, errors);
		return;
	}

	appid = req.params.appid;
	typeid = req.params.typeid;
	db.findEventTypeById({'application_id': appid, 'type_id': typeid}, responseHandler(res, next));
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
	var errors = req.validationErrors(),
		appid,
		name;
	if (errors) {
		responseHandler(res).error(400, errors);
		return;
	}

	appid = req.params.appid;
	name = req.params.name;
	db.createEventType({'application_id': appid, 'name': name}, responseHandler(res, next));
};

/**
 *
 * @param req the HTTP requests, contains header and body parameters
 * @param res the callback to which send HTTP response
 * @param next facilitate restify function chaining
 */
exports.update = function (req, res, next) {
	req.check('appid', '"appid": must be a valid identifier').notNull();
	req.check('name', '"name": must be a valid string').notNull();
	req.check('type_id', '"type_id": must be a valid identifier').notNull();
	var errors = req.validationErrors(),
		appid,
		name,
		type_id;
	if (errors) {
		responseHandler(res).error(400, errors);
		return;
	}

	appid = req.params.appid;
	name = req.params.name;
	type_id = req.params.type_id;
	db.updateEventType({'application_id': appid, 'name': name, 'type_id': type_id}, responseHandler(res, next));
};
