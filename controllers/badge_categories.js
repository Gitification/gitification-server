////////////////////////////////////////////////////////////////////////////////////
////// Badge categories
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
	db.findAllBadgeCategories({'application_id': appid}, responseHandler(res, next));
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
	req.check('categoryid', '"categoryid": must be a valid identifier').isInt();

	var appid = req.params.appid,
		categoryid = req.params.categoryid;
	db.findBadgeCategoryById({'application_id': appid, 'category_id': categoryid}, responseHandler(res, next));
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
	db.createBadgeCategory({'application_id': appid, 'name': name}, responseHandler(res, next));
};

/**
 *
 * @param req the HTTP requests, contains header and body parameters
 * @param res the callback to which send HTTP response
 * @param next facilitate restify function chaining
 */
exports.update = function (req, res, next) {
	req.onValidationError(function (msg) {
		responseHandler(res).error(400, msg);
	});
	req.check('appid', '"appid": must be a valid identifier').isInt();
	req.check('categoryid', '"categoryid": must be a valid identifier').isInt();
	req.check('name', '"name": must be a valid string').notNull();

	var appid = req.params.appid,
		categoryid = req.params.categoryid,
		name = req.params.name;
	db.updateBadgeCategory({'application_id': appid, 'category_id': categoryid, 'name': name}, responseHandler(res, next));
};
