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
	req.onValidationError(function (msg) {
		responseHandler(res).error(400, msg);
	});
	req.check('appid', '"appid": must be a valid identifier').isInt();

	var appid = req.params.appid;
	db.findAllEventTypes({'application_id': appid}, responseHandler(res, next));
};

/**
 *
 * @param req the HTTP requests, contains header and body parameters
 * @param res the callback to which send HTTP response
 * @param next facilitate restify function chaining
 */
exports.findById = function (req, res, next) {
	req.onValidationError(function (msg) {
		responseHandler(res).error(400, msg);
	});
	req.check('appid', '"appid": must be a valid identifier').isInt();
	req.check('typeid', '"typeid": must be a valid identifier').isInt();

	var appid = req.params.appid,
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
	req.onValidationError(function (msg) {
		responseHandler(res).error(400, msg);
	});
	req.check('appid', '"appid": must be a valid identifier').isInt();
	req.check('name', '"name": must be a valid string').notNull();

	var appid = req.params.appid,
		name = req.params.name;
	db.createEventType({'application_id': appid, 'name': name}, responseHandler(res, next));
};
