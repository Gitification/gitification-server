////////////////////////////////////////////////////////////////////////////////////
//// Ping
////////////////////////////////////////////////////////////////////////////////////
'use strict';

// DI
var responseHandler;

/**
 *
 * @param req the HTTP requests, contains header and body parameters
 * @param res the callback to which send HTTP response
 * @param next facilitate restify function chaining
 */
exports.ping = function (req, res/*, next*/) {
	responseHandler(res).success(200, "pong");
};


