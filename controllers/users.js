////////////////////////////////////////////////////////////////////////////////////
////// Users
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
	db.findAllUsers({'application_id': appid}, responseHandler(res, next));
};

/**
 *
 * @param req the HTTP requests, contains header and body parameters
 * @param res the callback to which send HTTP response
 * @param next facilitate restify function chaining
 */
exports.findById = function (req, res, next) {
	req.check('appid', '"appid": must be a valid identifier').notNull();
	req.check('userid', '"userid": must be a valid identifier').notNull();
	var errors = req.validationErrors(),
		appid,
		userid;
	if (errors) {
		responseHandler(res).error(400, errors);
		return;
	}

	appid = req.params.appid;
	userid = req.params.userid;
	db.findUserById({'application_id': appid, 'user_id': userid}, responseHandler(res, next));
};

/**
 *
 * @param req the HTTP requests, contains header and body parameters
 * @param res the callback to which send HTTP response
 * @param next facilitate restify function chaining
 */
exports.findBadgesById = function (req, res, next) {
	req.check('appid', '"appid": must be a valid identifier').notNull();
	req.check('userid', '"userid": must be a valid identifier').notNull();
	var errors = req.validationErrors(),
		appid,
		userid;
	if (errors) {
		responseHandler(res).error(400, errors);
		return;
	}

	appid = req.params.appid;
	userid = req.params.userid;
	db.findUserBadgesByUserId({'application_id': appid, 'user_id': userid}, responseHandler(res, next));
};

/**
 *
 * @param req the HTTP requests, contains header and body parameters
 * @param res the callback to which send HTTP response
 * @param next facilitate restify function chaining
 */
exports.create = function (req, res, next) {
	req.check('appid', '"appid": must be a valid identifier').notNull();
	req.check('login', '"login": must be a valid string').notNull();
	req.check('firstname', '"firstname": must be a valid string').notNull();
	req.check('lastname', '"lastname": must be a valid string').notNull();
	req.check('email', '"email": must be a valid Email adress').isEmail();
	var errors = req.validationErrors(),
		appid,
		login,
		firstname,
		lastname,
		email;
	if (errors) {
		responseHandler(res).error(400, errors);
		return;
	}

	appid = req.params.appid;
	login = req.params.login;
	firstname = req.params.firstname;
	lastname = req.params.lastname;
	email = req.params.email;
	db.createUser(
		{'application_id': appid, 'login': login, 'firstname': firstname, 'lastname': lastname, 'email': email},
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
	req.check('userid', '"userid": must be a valid identifier').notNull();
	req.check('login', '"login": must be a valid string').notNull();
	req.check('firstname', '"firstname": must be a valid string').notNull();
	req.check('lastname', '"lastname": must be a valid string').notNull();
	req.check('email', '"email": must be a valid Email adress').isEmail();
	var errors = req.validationErrors(),
		appid,
		userid,
		login,
		firstname,
		lastname,
		email;
	if (errors) {
		responseHandler(res).error(400, errors);
		return;
	}

	appid = req.params.appid;
	userid = req.params.userid;
	login = req.params.login;
	firstname = req.params.firstname;
	lastname = req.params.lastname;
	email = req.params.email;
	db.updateUser(
		{'application_id': appid, 'user_id': userid, 'login': login, 'firstname': firstname, 'lastname': lastname, 'email': email},
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
	req.check('userid', '"userid": must be a valid identifier').notNull();
	var errors = req.validationErrors(),
		appid,
		userid;
	if (errors) {
		responseHandler(res).error(400, errors);
		return;
	}

	appid = req.params.appid;
	userid = req.params.userid;
	db.deleteUser({'application_id': appid, 'user_id': userid}, responseHandler(res, next));
};
