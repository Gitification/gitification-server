/**********************************************************
 * This file is part of the Gitification project
 *
 * Authors	:	Vincent Pasquier, Vincent Grivel
 *						Dorian Gambin, Geoffrey Papaux
 *
 * Purpose :	PARTIAL Implementation of the database connector
 *						for mysql. Only some requests implemented to add
 *						data in database and benchmark some queries.
 *
 *********************************************************/

'use strict';

var mysql = require('mysql');
var async = require('async');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'gitification_db'
});
var id_query = 'SELECT LAST_INSERT_ID() as id';

connection.connect();

exports.findAllApplications = function (callback) {
	connection.query('SELECT * from application', function (err, rows/*, fields*/) {
		if (err) {
			throw err;
		}

		var applications = [];

		rows.forEach(function (row) {
			applications.push(
				{
					application_id: row.id.toString(),
					site: row.site,
					callback: row.callback,
					admin: row.admin,
					statistics: {
						user_count: "1", // TODO
						event_count: "1",
						badge_count: "1",
						rule_count: "1"
					}
				});
		});

		callback.send(applications);
	});
};


/**
 *
 * @param app
 * @param callback
 */
exports.findLeaderboard = function (app, callback) {
	var sql_query = 'SELECT *, count(u.id) as badge_cnt ' +
									'FROM user u JOIN user_has_badge uhb ON uhb.user_id=u.id ' +
									'WHERE u.application_id=' + app.application_id + ' ' +
									'GROUP BY u.id ' +
									'ORDER BY badge_cnt DESC ';
	connection.query(sql_query, function (err, rows/*, fields*/) {
		if (err) {
			throw err;
		}

		var applications, pos;

		applications = [];
		pos = 1;

		rows.forEach(function (row) {
			applications.push(
				{
					position: pos,
					user_id: row.id.toString(),
					login: row.login,
					firstname: row.firstname,
					lastname: row.lastname,
					email: row.email,
					statistics: {
						badge_count: row.badge_cnt.toString()
					}
				});

			pos++;
		});

		callback.send(applications);
	});
};








////////////////////////////////////////////////////////////////////////////////////
// Application
////////////////////////////////////////////////////////////////////////////////////


exports.createApplication = function (input, callback) {
	var app = {}, payload = {}, sql_query, params;
	app.site = input.site;
	app.callback = input.callback;
	app.admin = input.admin;
	app.createdAt = new Date();


	sql_query = 'INSERT INTO application (site, callback, admin)' +
							'VALUES (?, ?, ?)';
	params		=	[app.site, app.callback, app.admin];

	connection.query(sql_query, params, function (err/*, rows, fields*/) {
		if (err) {
			throw err;
		}

		connection.query(id_query, function (err, rows/*, fields*/) {
			if (err) {
				throw err;
			}
			app.application_id = rows[0].id.toString();
			payload = {'application_id': app.application_id, 'api_key': "api_key", 'secret_key': "secret_key"};
			callback.success(201, "Successfully registered.", payload);
		});
	});



};


//////////////////////////////////////////////////////////////////////////////////////
//// Users
//////////////////////////////////////////////////////////////////////////////////////


/**
 *
 * @param user
 * @param callback
 */
exports.findUserBadgesByUserId = function (user, callback) {
	var payload = {}, i = 0, sql_query, params;
	payload.user_id = user.user_id;
	payload.badges_list = [];

	sql_query = 'SELECT uhb.badge_id as badge_id, b.name as name, b.icon as icon FROM user_has_badge uhb ' +
							'JOIN badge b ON uhb.badge_id = b.id ' +
							'WHERE uhb.user_id = ?';

	params		= [user.user_id];

	connection.query(sql_query, params, function (err, rows/*, fields*/) {
		if (err) {
			throw err;
		}

		if (rows.length === 0) { callback.send(payload); }
		rows.forEach(function (entry) {
			payload.badges_list[i] = entry;
			i++;
		});
		callback.send(payload);
	});
};


exports.findAllUsers = function (app, callback) {
	connection.query('SELECT * FROM user WHERE user.application_id =' + app.application_id, function (err, rows/*, fields*/) {
		if (err) {
			throw err;
		}

		callback.send(rows);
	});
};

/**
 *
 * @param user
 * @param callback
 */
exports.createUser = function (user, callback) {
	var payload = {}, sql_query, params;

	sql_query = 'INSERT INTO user (application_id, login, firstname, lastname, email)' +
							'VALUES (?, ?, ?, ?, ?)';
	params		=	[user.application_id, user.login, user.firstname, user.lastname, user.email];

	connection.query(sql_query, params, function (err/*, rows, fields*/) {
		if (err) {
			throw err;
		}

		// get id of created event
		connection.query(id_query, function (err, rows/*, fields*/) {
			if (err) {
				throw err;
			}
			user.user_id = rows[0].id;
			payload.user_id = user.user_id.toString();
			callback.success(201, "Successfully created user", payload);
		});
	});
};
//////////////////////////////////////////////////////////////////////////////////////
//// Events
//////////////////////////////////////////////////////////////////////////////////////



function check_badge_award_after_event_insert(event, callback) {
	var sql_query, params;

	// get the list of badges to award... one simple mysql request
	sql_query = 'SELECT r.badge_id FROM rule r ' +
							'JOIN rule_has_type rht ON r.id=rht.rule_id ' +
							'WHERE rht.type_id=? ' +
							'AND ' +
							'(SELECT COUNT(*) FROM event WHERE user_id=? AND type_id=?) ' +
							'>= rht.threshold ' +
							'AND r.badge_id NOT IN ' +
							'(SELECT uhb.badge_id FROM user_has_badge uhb WHERE uhb.user_id = ?) ' +
							'GROUP BY r.badge_id';
	params		= [event.type, event.user, event.type, event.user];

	connection.query(sql_query, params, function (err, rows/*, fields*/) {
		if (err) {
			throw err;
		}
		// rows contain now the list of badges to award for this user
		console.log(rows);
		async.forEach(rows, function (row, cb) { //The second argument (callback) is the "task callback" for a specific messageId
			var badge_id = row.badge_id;
			sql_query = 'INSERT INTO user_has_badge (user_id, badge_id) ' +
									'VALUES (?, ?)';
			params		=	[event.user, badge_id];

			// insert
			console.log(event.event_id);
			connection.query(sql_query, params, function (err/*, rows, fields*/) {
				if (err) {
					throw err;
				}
				cb();
			});
    }, function (err) {
			if (err) {
				throw err;
			}
			//Tell the user about the great success
			event.event_id = event.event_id.toString();
			callback.success(201, "Successfully created event", event);
    });
	});
}

/**
 *
 * @param event
 * @param callback
 */
exports.createEvent = function (event, callback) {
	var sql_query, params;

	sql_query = 'INSERT INTO event (type_id, user_id, application_id, issued) ' +
							'VALUES (?, ?, ?, ?)';

	params		= [event.type, event.user, event.application_id, event.issued];

	connection.query(sql_query, params, function (err/*, rows, fields*/) {
		if (err) {
			throw err;
		}
		// get id of created event
		connection.query(id_query, function (err, rows/*, fields*/) {
			if (err) {
				throw err;
			}
			event.event_id = rows[0].id;
			console.log(event);
			check_badge_award_after_event_insert(event, callback);
		});
	});
};


//////////////////////////////////////////////////////////////////////////////////////
//// Event Types
//////////////////////////////////////////////////////////////////////////////////////

/**
 * Saves a new event type
 * @param eventtype
 * @param callback
 */
exports.createEventType = function (eventtype, callback) {
	var sql_query, params;

	sql_query = 'INSERT INTO type (application_id, name)' +
							'VALUES (?, ?)';
	params		=	[eventtype.application_id, eventtype.name];

	connection.query(sql_query, params, function (err/*, rows, fields*/) {
		if (err) {
			throw err;
		}

		connection.query(id_query, function (err, rows/*, fields*/) {
			if (err) {
				throw err;
			}
			eventtype.type_id = rows[0].id.toString();
			callback.success(201, "Successfully created event", eventtype);
		});
	});
};

//////////////////////////////////////////////////////////////////////////////////////
//// Rules
//////////////////////////////////////////////////////////////////////////////////////


/**
 * Saves a new rule
 * @param rule
 * @param callback
 */
exports.createRule = function (rule, callback) {
	var sql_query, params;

	sql_query = 'INSERT INTO rule (application_id, badge_id, name)' +
							'VALUES (?, ?, ?)';
	params		=	[rule.application_id, rule.badge_id, rule.name];

	// create rule
	connection.query(sql_query, params, function (err/*, rows, fields*/) {
		if (err) {
			throw err;
		}

		// get id of created rule
		connection.query(id_query, function (err, rows/*, fields*/) {
			if (err) {
				throw err;
			}
			rule.rule_id = rows[0].id;

			// create link to event type
			sql_query = 'INSERT INTO rule_has_type (rule_id, type_id, threshold)' +
									'VALUES (?, ?, ?)';
			params		=	[rule.rule_id, rule.event_types[0].event_type, rule.event_types[0].threshold];

			connection.query(sql_query, params, function (err/*, rows, fields*/) {
				if (err) {
					throw err;
				}
				// convert toString before sending to client
				rule.rule_id = rule.rule_id.toString();
				callback.success(201, "Successfully created rule", rule);
			});
		});
	});
};




//////////////////////////////////////////////////////////////////////////////////////
//// Badges
//////////////////////////////////////////////////////////////////////////////////////

/**
 * Saves a new badge
 * @param badge
 * @param callback
 */
exports.createBadge = function (badge, callback) {
	var sql_query, params;

	sql_query = 'INSERT INTO badge (application_id, name, icon)' +
							'VALUES (?, ?, ?)';
	params		=	[badge.application_id, badge.name, badge.icon];

	connection.query(sql_query, params, function (err/*, rows, fields*/) {
		if (err) {
			throw err;
		}

		connection.query(id_query, function (err, rows/*, fields*/) {
			if (err) {
				throw err;
			}
			// convert to string before sending to client
			badge.badge_id = rows[0].id.toString();
			callback.success(201, "Successfully created badge", badge);
		});
	});
};


//////////////////////////////////////////////////////////////////////////////////////
//// Badge Categories
//////////////////////////////////////////////////////////////////////////////////////

/**
 * Saves a new badge category
 * @param category
 * @param callback
 */
 /* Unused in this model...
exports.createBadgeCategory = function (category, callback) {
	// TODO implement

	category.category_id = shortid.generate();
	rc.save(bPrefix + "badgeCategory" + category.application_id, category.category_id, category, function (err, result, meta) {
		if (magicCheck(callback, err, result, meta)) { return; }
		callback.success(201, "Successfully created badge category", category);
	});
};
*/
