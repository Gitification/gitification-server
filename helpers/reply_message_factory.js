/**********************************************************
 * This file is part of the Gitification project
 *
 * Authors	: Vincent Pasquier, Vincent Grivel
 *						Dorian Gambin, Geoffrey Papaux
 *
 * Purpose :	This file provides pre-defined functions
 *						to create standard messages sent by the
 *						gitification server
 *
 *********************************************************/
'use strict';

exports.success = function (message, payload) {
	return {
		code: "success",
		message: message,
		payload: payload
	};
};
