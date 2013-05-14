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
var async = require('async');

function magicCheck(callback, err, result, meta) {
	if (err !== null) {
		console.log("error riak");
		console.log(err);
		callback.error(err.statusCode, meta);
		return true;
	}
	return false;
}

////////////////////////////////////////////////////////////////////////////////////
// Application
////////////////////////////////////////////////////////////////////////////////////

exports.findAllApplications = function (callback) {
	rc.getAll(bPrefix + "application", function (err, result, meta) {
		if (magicCheck(callback, err, result, meta)) { return; }
		callback.send(result);
	});
};


exports.findApplicationById = function (app, callback) {
	rc.get(bPrefix + "application", app.application_id, function (err, result, meta) {
		if (magicCheck(callback, err, result, meta)) { return; }
		callback.send(result);
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

	rc.save(bPrefix + "application", app.application_id, app, function (err, result, meta) {
		if (magicCheck(callback, err, result, meta)) { return; }
		callback.success(201, "Successfully registered.", payload);
	});
};


////////////////////////////////////////////////////////////////////////////////////
// Leaderboard
////////////////////////////////////////////////////////////////////////////////////

/**
 *
 * @param app
 * @param callback
 */
exports.findLeaderboard = function (app, callback) {
	var board = [];
	rc.getAll(bPrefix + "user" + app.application_id, function (err, result, meta) {
		if (magicCheck(callback, err, result, meta)) { return; }
		if (result.length === 0) { callback.send(board); }
		var queue = async.queue(function (item, cbQueue) {
			var cbWalk = cbQueue;
			rc.walk(bPrefix + "user" + app.application_id, item.user_id, [{bucket: bPrefix + "badge" + item.application_id, tag: "hasBadge"}], function (err, result/*, meta*/) {
				item.statistics = {};
				item.statistics.badge_count = result[0].length;
				board.push(item);
				cbWalk();
			});
		}, 10);
 
		queue.drain = function () {
			callback.send(board);
		};
		async.each(result, function (item) {
			queue.push(item);
		});
	});
};

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
		if (magicCheck(callback, err, result, meta)) { return; }
		callback.send(result);
	});
};

/**
 *
 * @param user
 * @param callback
 */
exports.findUserById = function (user, callback) {
	rc.get(bPrefix + "user" + user.application_id, user.user_id, function (err, result, meta) {
		if (magicCheck(callback, err, result, meta)) { return; }
		console.log(meta);
		callback.send(result);
	});
};

/**
 *
 * @param user
 * @param callback
 */
exports.findUserBadgesByUserId = function (user, callback) {
	var payload = {}, i = 0;
	payload.user_id = user.user_id;
	payload.badges_list = [];

	rc.walk(bPrefix + "user" + user.application_id, user.user_id, [{bucket: bPrefix + "badge" + user.application_id, tag: "hasBadge"}], function (err, result/*, meta*/) {
		if (result.length > 1) { console.log("error 42, ask perdjesk"); }
		if (result[0].length === 0) { callback.send(payload); }
		result[0].forEach(function (entry) {
			payload.badges_list[i] = entry.data;
			i++;
		});
		callback.send(payload);
	});
};

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
		if (magicCheck(callback, err, result, meta)) { return; }
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
		if (magicCheck(callback, err, result, meta)) { return; }
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
		if (magicCheck(callback, err, result, meta)) { return; }
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
		if (magicCheck(callback, err, result, meta)) { return; }
		callback.send(result);
	});
};

/**
 *
 * @param event
 * @param callback
 */
exports.findEventById = function (event, callback) {
	rc.get(bPrefix + "event" + event.application_id, event.event_id, function (err, result, meta) {
		if (magicCheck(callback, err, result, meta)) { return; }
		callback.send(result);
	});
};

function existsLink(links, link) {
	var exists = false;
	links.forEach(function (item) {
		if (item.bucket === link.bucket && item.key === link.key && item.tag === link.tag) {
			exists = true;
			return false;
		}
	});
	return exists;
}


function awardBadge(callback, event, nbEvents, rules) {
	var rule, link;
	async.eachSeries(rules, function (item, cb) {
		rule = item.data;
		if (nbEvents >= rule.event_types[0].threshold) {
			rc.get(bPrefix + "user" + event.application_id, event.user, function (err, result, meta) {
				if (magicCheck(callback, err, result, meta)) { cb("err"); }
				link = { bucket: bPrefix + "badge" + rule.application_id, key: rule.badge_id, tag: "hasBadge" };
				if (existsLink(meta.links, link)) { cb(); }
				meta.links.push(link);
				rc.save(bPrefix + "user" + event.application_id, event.user, result, meta, function (err, result, meta) {
					if (magicCheck(callback, err, result, meta)) { cb("err"); }
					cb();
				});
			});
		}
		else { cb(); }

	}, function (err) {
		if (err) { return; }
		callback();
	}
	);
}

/**
 *
 * @param event
 * @param callback
 */
exports.createEvent = function (event, callback) {
	var nbEvents = 0;
	event.event_id = shortid.generate();

	async.series([
		function (cb) {
			rc.exists(bPrefix + "eventType" + event.application_id, event.type, function (err, result/*, meta*/) {
				if (!result) { callback.error(404, "Event Type does not exist"); cb("err"); }
				cb();
			});
		},
		function (cb) {
			rc.exists(bPrefix + "user" + event.application_id, event.user, function (err, result/*, meta*/)  {
				if (!result) { callback.error(404, "User Type does not exist"); cb("err"); }
				cb();
			});
		},
		function (cb) {
			rc.save(bPrefix + "event" + event.application_id, event.type + "-" + event.user + "-" + event.event_id, event, function (err, result, meta) {
				if (magicCheck(callback, err, result, meta)) { cb("er"); }
				cb();
			});
		},
		function (cb) {
			rc.mapreduce.add({bucket: bPrefix + "event" + event.application_id, "key_filters": [["and", [["tokenize", "-", 1], ["eq", event.type]], [["tokenize", "-", 2], ["eq", event.user]]]]}).map('Riak.mapValuesJson').run(function (err, result, meta) {
				if (magicCheck(callback, err, result, meta)) { cb("er"); }
				nbEvents = result.length;
				cb();
			});
		},
		function (cb) {
			rc.walk(bPrefix + "eventType" + event.application_id, event.type, [{bucket: bPrefix + "rule" + event.application_id, tag: "hasRule"}], function (err, result/*, meta*/) {
				if (result.length > 1) { console.log("error 42, ask perdjesk"); }
				awardBadge(cb, event, nbEvents, result[0]);
			});
			
		}
	],
	function (err) {
		if (err) { return; }
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
		if (magicCheck(callback, err, result, meta)) { return; }
		callback.send(result);
	});
};

/**
 *
 * @param eventtype
 * @param callback
 */
exports.findEventTypeById = function (eventtype, callback) {
	rc.get(bPrefix + "eventType" + eventtype.application_id, eventtype.type_id, function (err, result, meta) {
		if (magicCheck(callback, err, result, meta)) { return; }
		console.log(meta);
		callback.send(result);
	});
};

/**
 * Saves a new event type
 * @param eventtype
 * @param callback
 */
exports.createEventType = function (eventtype, callback) {
	eventtype.type_id = shortid.generate();
	rc.save(bPrefix + "eventType" + eventtype.application_id, eventtype.type_id, eventtype, function (err, result, meta) {
		if (magicCheck(callback, err, result, meta)) { return; }
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
		if (magicCheck(callback, err, result, meta)) { return; }
		callback.send(result);
	});
};

/**
 *
 * @param rule
 * @param callback
 */
exports.findRuleById = function (rule, callback) {
	rc.get(bPrefix + "rule" + rule.application_id, rule.rule_id, function (err, result, meta) {
		if (magicCheck(callback, err, result, meta)) { return; }
		console.log(meta);
		callback.send(result);
	});
};

/**
 * Saves a new rule
 * @param rule
 * @param callback
 */
exports.createRule = function (rule, callback) {
	rule.rule_id = shortid.generate();

	async.series([
		function (cb) {
			rc.exists(bPrefix + "badge" + rule.application_id, rule.badge_id, function (err, result/*, meta*/) {
				if (!result) { callback.error(404, "Badge does not exist"); cb("err"); }
				cb();
			});
		},
		function (cb) {
			rc.exists(bPrefix + "eventType" + rule.application_id, rule.event_types[0].event_type, function (err, result/*, meta*/) {
				if (!result) { callback.error(404, "Event type does not exist"); cb("err"); }
				cb();
			});
		},
		function (cb) {
			rc.get(bPrefix + "eventType" + rule.application_id, rule.event_types[0].event_type, function (err, eventtype, meta) {
				if (magicCheck(callback, err, eventtype, meta)) { cb("err"); }
				meta.links.push({ bucket: bPrefix + "rule" + rule.application_id, key: rule.rule_id, tag: "hasRule" });
				rc.save(bPrefix + "eventType" + eventtype.application_id, eventtype.type_id, eventtype, meta, function (err, result, meta) {
					if (magicCheck(callback, err, result, meta)) { cb("err"); }
					cb();
				});
			});
		},
		function (cb) {
			rc.save(bPrefix + "rule" + rule.application_id, rule.rule_id, rule, function (err, result, meta) {
				if (magicCheck(callback, err, result, meta)) { cb("err"); }
				cb();
			});
		}

	],
	function (err) {
		if (err) { return; }
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
		if (magicCheck(callback, err, result, meta)) { return; }
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
		if (magicCheck(callback, err, result, meta)) { return; }
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
		if (magicCheck(callback, err, result, meta)) { return; }
		callback.send(result);
	});
};

/**
 *
 * @param badge
 * @param callback
 */
exports.findBadgeById = function (badge, callback) {
	rc.get(bPrefix + "badge" + badge.application_id, badge.badge_id, function (err, result, meta) {
		if (magicCheck(callback, err, result, meta)) { return; }
		callback.send(result);
	});
};

/**
 * Saves a new badge
 * @param badge
 * @param callback
 */
exports.createBadge = function (badge, callback) {
	badge.badge_id = shortid.generate();

	rc.save(bPrefix + "badge" + badge.application_id, badge.badge_id, badge, function (err, result, meta) {
		if (magicCheck(callback, err, result, meta)) { return; }
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
		if (magicCheck(callback, err, result, meta)) { return; }
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
		if (magicCheck(callback, err, result, meta)) { return; }
		callback.send(result);
	});
};

/**
 *
 * @param category
 * @param callback
 */
exports.findBadgeCategoryById = function (category, callback) {
	rc.get(bPrefix + "badgeCategory" + category.application_id, category.category_id, function (err, result, meta) {
		if (magicCheck(callback, err, result, meta)) { return; }
		callback.send(result);
	});
};

/**
 * Saves a new badge category
 * @param category
 * @param callback
 */
exports.createBadgeCategory = function (category, callback) {
	category.category_id = shortid.generate();
	rc.save(bPrefix + "badgeCategory" + category.application_id, category.category_id, category, function (err, result, meta) {
		if (magicCheck(callback, err, result, meta)) { return; }
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
		if (magicCheck(callback, err, result, meta)) { return; }
		callback.success(200, "Successfully updated badge category", category);
	});
};
