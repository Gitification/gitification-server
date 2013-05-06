////////////////////////////////////////////////////////////////////////////////////
////// Events
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
	db.findAllEvents({'application_id': appid}, responseHandler(res, next));
};

/**
 *
 * @param req the HTTP requests, contains header and body parameters
 * @param res the callback to which send HTTP response
 * @param next facilitate restify function chaining
 */
exports.findById = function (req, res, next) {
	req.check('appid', '"appid": must be a valid identifier').notNull();
	req.check('eventid', '"eventid": must be a valid identifier').notNull();
	var errors = req.validationErrors(),
		appid,
		eventid;
	if (errors) {
		responseHandler(res).error(400, errors);
		return;
	}

	appid = req.params.appid;
	eventid = req.params.eventid;
	db.findEventById({'application_id': appid, 'event_id': eventid}, responseHandler(res, next));
};

/**
 *
 * @param req the HTTP requests, contains header and body parameters
 * @param res the callback to which send HTTP response
 * @param next facilitate restify function chaining
 */
exports.create = function (req, res, next) {
	req.check('appid', '"appid": must be a valid identifier').notNull();
	req.check('type', '"type": must be a valid identifier').notNull();
	req.check('user', '"user": must be a valid identifier').notNull();
	req.check('issued', '"date": must be a valid date').isDate();
	var errors = req.validationErrors(),
		appid,
		type,
		user,
		issued;
	if (errors) {
		responseHandler(res).error(400, errors);
		return;
	}

	appid = req.params.appid;
	type = req.params.type;
	user = req.params.user;
	issued = req.params.issued; // or "2013-02-26"; // TODO today or specified
	db.createEvent(
		{'application_id': appid, 'type': type, 'user': user, 'issued': issued},
		responseHandler(res, next)
	);
};
