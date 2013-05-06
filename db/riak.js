/**********************************************************
 * This file is part of the Gitification project
 *
 * Authors	:	Vincent Pasquier, Vincent Grivel
 *						Dorian Gambin, Geoffrey Papaux
 *
 * Purpose :	Implementation of the database functions using
 *						querying the riak db
 *
 *********************************************************/
'use strict';

var rc = require('riak-js').getClient();
var shortid = require('shortid');
var bPrefix = "gitification_"; // set a prefix for all the bucket used by this application

function magicCheck(callback, err, result, meta) {
	if (err !== null) {
		callback.error(err.statusCode, meta);
		return;
	}
	if (result && result !== null) {
		callback.send(result);
		return;
	}
}

////////////////////////////////////////////////////////////////////////////////////
// Application
////////////////////////////////////////////////////////////////////////////////////

exports.findAllApplications = function (callback) {
	rc.getAll(bPrefix + "application", function (err, result, meta) {
		magicCheck(callback, err, result, meta);
	});
};


exports.findApplicationById = function (app, callback) {
	rc.get(bPrefix + "application", app.application_id, function (err, result, meta) {
		magicCheck(callback, err, result, meta);
	});
};

exports.createApplication = function (input, callback) {
	var app = {}, statistics = {}, payload = {};
	app.application_id = shortid.generate();
	app.site = input.site;
	app.callback = input.callback;
	app.admin = input.admin;
	app.createdAt = new Date();

	statistics = {
		user_count: 0,
		event_count: 0,
		badge_count: 0,
		rule_count: 0
	};
	app.statistics = statistics;

	payload = {'application_id': app.application_id, 'api_key': "api_key", 'secret_key': "secret_key"};

	rc.save(bPrefix + "application", app.application_id, app, function (/*err, result, meta*/) {
		callback.success(201, "Successfully registered.", payload);
	});
};


////////////////////////////////////////////////////////////////////////////////////
// Leaderboard
////////////////////////////////////////////////////////////////////////////////////

///**
// *
// * @param app
// * @param callback
// */
//exports.findLeaderboard = function (app, callback) {
//	callback.send([
//		{
//			position: 1,
//			user_id: 0,
//			login: "gpap",
//			firstname: "geoffrey",
//			lastname: "papaux",
//			email: "geoffrey.papaux@master.hes-so.ch",
//			statistics: {
//				badge_count: 1
//			}
//		}
//	]);
//};

//////////////////////////////////////////////////////////////////////////////////////
//// Users
//////////////////////////////////////////////////////////////////////////////////////

/**
 *
 * @param app
 * @param callback
 */
exports.findAllUsers = function (app, callback) {
	rc.getAll(bPrefix + "user" + app.application_id, function (err, result, meta) {
		magicCheck(callback, err, result, meta);
	});
};

/**
 *
 * @param user
 * @param callback
 */
exports.findUserById = function (user, callback) {
	rc.get(bPrefix + "user" + user.application_id, user.user_id, function (err, result, meta) {
		magicCheck(callback, err, result, meta);
	});
};

///**
// *
// * @param user
// * @param callback
// */
//exports.findUserBadgesByUserId = function (user, callback) {
//	callback.send({
//		user_id: user.user_id,
//		badges_list: [
//			{
//				badge_id: 1,
//				category_id: 1,
//				name: "Super hero",
//				icon: "blu.png"
//			}
//		]
//	});
//};

/**
 *
 * @param user
 * @param callback
 */
exports.createUser = function (user, callback) {
	var payload = {};
	user.user_id = shortid.generate();
	payload.user_id = user.user_id;
	rc.save(bPrefix + "user" + user.application_id, user.user_id, user, function (err, result, meta) {
		magicCheck(callback, err, result, meta);
		callback.success(201, "	Successfully created user", payload);
	});
};

/**
 *
 * @param user
 * @param callback
 */
exports.updateUser = function (user, callback) {
	rc.save(bPrefix + "user" + user.application_id, user.user_id, user, function (err, result, meta) {
		magicCheck(callback, err, result, meta);
		callback.success(200, "User was updated.", user);
	});
};

/**
 *
 * @param user
 * @param callback
 */
exports.deleteUser = function (user, callback) {
	rc.remove(bPrefix + "user" + user.application_id, user.user_id, function (err, result, meta) {
		magicCheck(callback, err, result, meta);
		callback.success(200, "Successfully deleted user", user);
	});
};

//////////////////////////////////////////////////////////////////////////////////////
//// Events
//////////////////////////////////////////////////////////////////////////////////////

/**
 *
 * @param callback
 */
exports.findAllEvents = function (app, callback) {
	rc.getAll(bPrefix + "event" + app.application_id, function (err, result, meta) {
		magicCheck(callback, err, result, meta);
	});
};

/**
 *
 * @param event
 * @param callback
 */
exports.findEventById = function (event, callback) {
	rc.get(bPrefix + "event" + event.application_id, event.event_id, function (err, result, meta) {
		magicCheck(callback, err, result, meta);
	});
};

/**
 *
 * @param event
 * @param callback
 */
exports.createEvent = function (event, callback) {
	event.event_id = shortid.generate();
	rc.save(bPrefix + "event" + event.application_id, event.event_id, event, function (err, result, meta) {
		magicCheck(callback, err, result, meta);
		callback.success(201, "Successfully created event", event);
	});
	
};

//////////////////////////////////////////////////////////////////////////////////////
//// Event Types
//////////////////////////////////////////////////////////////////////////////////////

/**
 *
 * @param callback
 */
exports.findAllEventTypes = function (app, callback) {
	rc.getAll(bPrefix + "eventType" + app.application_id, function (err, result, meta) {
		magicCheck(callback, err, result, meta);
	});
};

/**
 *
 * @param eventtype
 * @param callback
 */
exports.findEventTypeById = function (eventtype, callback) {
	rc.get(bPrefix + "eventType" + eventtype.application_id, eventtype.type_id, function (err, result, meta) {
		magicCheck(callback, err, result, meta);
	});
};

/**
 * Saves a new event type
 * @param eventtype
 * @param callback
 */
exports.createEventType = function (eventtype, callback) {
	eventtype.type_id = shortid.generate();
	rc.save(bPrefix + "eventType" + eventtype.application_id, eventtype.type_id, event, function (err, result, meta) {
		magicCheck(callback, err, result, meta);
		callback.success(201, "Successfully created event", eventtype);
	});
	
};

//////////////////////////////////////////////////////////////////////////////////////
//// Rules
//////////////////////////////////////////////////////////////////////////////////////

/**
 *
 * @param app
 * @param callback
 */
exports.findAllRules = function (app, callback) {
	rc.getAll(bPrefix + "rule" + app.application_id, function (err, result, meta) {
		magicCheck(callback, err, result, meta);
	});
};

/**
 *
 * @param rule
 * @param callback
 */
exports.findRuleById = function (rule, callback) {
	rc.get(bPrefix + "rule" + rule.application_id, rule.rule_id, function (err, result, meta) {
		magicCheck(callback, err, result, meta);
	});
};

/**
 * Saves a new rule
 * @param rule
 * @param callback
 */
exports.createRule = function (rule, callback) {
	rule.rule_id = shortid.generate();
	rc.save(bPrefix + "rule" + rule.application_id, rule.rule_id, event, function (err, result, meta) {
		magicCheck(callback, err, result, meta);
		callback.success(201, "Successfully created rule", rule);
	});
};

/**
 *
 * @param rule
 * @param callback
 */
exports.updateRule = function (rule, callback) {
	rc.save(bPrefix + "rule" + rule.application_id, rule.rule_id, rule, function (err, result, meta) {
		magicCheck(callback, err, result, meta);
		callback.success(200, "Successfully updated rule", rule);
	});
};

/**
 *
 * @param rule
 * @param callback
 */
exports.deleteRule = function (rule, callback) {
	rc.remove(bPrefix + "rule" + rule.application_id, rule.rule_id, function (err, result, meta) {
		magicCheck(callback, err, result, meta);
		callback.success(200, "Successfully deleted rule", rule);
	});
};

//////////////////////////////////////////////////////////////////////////////////////
//// Badges
//////////////////////////////////////////////////////////////////////////////////////

/**
 *
 * @param app
 * @param callback
 */
exports.findAllBadges = function (app, callback) {
	rc.getAll(bPrefix + "badge" + app.application_id, function (err, result, meta) {
		magicCheck(callback, err, result, meta);
	});
};

/**
 *
 * @param badge
 * @param callback
 */
exports.findBadgeById = function (badge, callback) {
	rc.get(bPrefix + "badge" + badge.application_id, badge.badge_id, function (err, result, meta) {
		magicCheck(callback, err, result, meta);
	});
};

/**
 * Saves a new badge
 * @param badge
 * @param callback
 */
exports.createBadge = function (badge, callback) {
	badge.badge_id = shortid.generate();
	rc.save(bPrefix + "badge" + badge.application_id, badge.badge_id, event, function (err, result, meta) {
		magicCheck(callback, err, result, meta);
		callback.success(201, "Successfully created badge", badge);
	});
};

/**
 *
 * @param badge
 * @param callback
 */
exports.updateBadge = function (badge, callback) {
	rc.save(bPrefix + "badge" + badge.application_id, badge.badge_id, badge, function (err, result, meta) {
		magicCheck(callback, err, result, meta);
		callback.success(200, "Badge was updated.", badge);
	});
};

//////////////////////////////////////////////////////////////////////////////////////
//// Badge Categories
//////////////////////////////////////////////////////////////////////////////////////

/**
 *
 * @param app
 * @param callback
 */
exports.findAllBadgeCategories = function (app, callback) {
	rc.getAll(bPrefix + "badgeCategory" + app.application_id, function (err, result, meta) {
		magicCheck(callback, err, result, meta);
	});
};

/**
 *
 * @param category
 * @param callback
 */
exports.findBadgeCategoryById = function (category, callback) {
	rc.get(bPrefix + "badgeCategory" + category.application_id, category.category_id, function (err, result, meta) {
		magicCheck(callback, err, result, meta);
	});
};

/**
 * Saves a new badge category
 * @param category
 * @param callback
 */
exports.createBadgeCategory = function (category, callback) {
	category.category_id = shortid.generate();
	rc.save(bPrefix + "badgeCategory" + category.application_id, category.category_id, event, function (err, result, meta) {
		magicCheck(callback, err, result, meta);
		callback.success(201, "Successfully created badge category", category);
	});
};

/**
 *
 * @param category
 * @param callback
 */
exports.updateBadgeCategory = function (category, callback) {
	rc.save(bPrefix + "badgeCategory" + category.application_id, category.category_id, category, function (err, result, meta) {
		magicCheck(callback, err, result, meta);
		callback.success(200, "Successfully updated badge category", category);
	});
};
