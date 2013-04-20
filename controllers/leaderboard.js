////////////////////////////////////////////////////////////////////////////////////
////// Leaderboard
//////////////////////////////////////////////////////////////////////////////////////
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
	db.findLeaderboard({'application_id': appid}, responseHandler(res, next));
};
