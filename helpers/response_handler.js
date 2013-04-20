/**********************************************************
 * This file is part of the Gitification project
 *
 * Authors  : Vincent Pasquier, Vincent Grivel
 *            Dorian Gambin, Geoffrey Papaux
 *
 * Purpose :  This file provides pre-defined functions
 *            to respond to requests accordingly.
 *
 *********************************************************/
'use strict';

var reply = function (code, message, payload) {
	var toReturn = {
		code: code,
		message: message
	};
	if (payload !== 'undefined') {
		toReturn.payload = payload;
	}
	return toReturn;
};

module.exports = function (res, next) {
	return {
		send: function (payload) {
			res.send(payload);
			next();
		},
		success: function (message, payload) {
			res.send(reply("success", message, payload));
		},
		error: function (status, message, payload) {
			res.send(status, reply("error", message, payload));
		}
	};
};