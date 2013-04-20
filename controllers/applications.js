////////////////////////////////////////////////////////////////////////////////////
//// Applications
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
	db.findAllApplications(responseHandler(res, next));
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

	var appid = req.params.appid;
	db.findApplicationById({'application_id': appid}, responseHandler(res, next));
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
	req.check('site', '"site": must be a valid URL').isUrl();
	req.check('callback', '"callback": must be a valid URL').isUrl();
	req.check('admin', '"admin": must be a valid Email adress').isEmail();

	var site = req.params.site,
		callback = req.params.callback,
		admin = req.params.admin;
	db.createApplication({'site': site, 'callback': callback, 'admin': admin}, responseHandler(res, next));
};
