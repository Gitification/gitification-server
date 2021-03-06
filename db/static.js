/**********************************************************
 * This file is part of the Gitification project
 *
 * Authors  :  Vincent Pasquier, Vincent Grivel
 *            Dorian Gambin, Geoffrey Papaux
 *
 * Purpose :  Implementation of the database functions returning
 *            static content
 *
 *********************************************************/
'use strict';

////////////////////////////////////////////////////////////////////////////////////
// Application
////////////////////////////////////////////////////////////////////////////////////

/**
 *
 * @param callback
 */
exports.findAllApplications = function (callback) {
	callback.send([
		{
			application_id: 1,
			site: "sample",
			callback: "callback",
			created_at: "1366126364265",
			admin: "admin",
			statistics: {
				user_count: 1,
				event_count: 1,
				badge_count: 1,
				rule_count: 1
			}
		}
	]);
};

/**
 *
 * @param app
 * @param callback
 */
exports.findApplicationById = function (app, callback) {
	callback.send({
		application_id: app.id,
		site: "sample",
		callback: "callback",
		created_at: "20130327",
		admin: "admin",
		statistics: {
			user_count: 1,
			event_count: 1,
			badge_count: 1,
			rule_count: 1
		}
	});
};

/**
 *
 * @param app
 * @param callback
 */
exports.createApplication = function (app, callback) {
	callback.success(201, "Successfully registered.", {'api_key': "api_key", 'secret_key': "secret_key"});
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
	callback.send([
		{
			position: 1,
			user_id: 0,
			login: "gpap",
			firstname: "geoffrey",
			lastname: "papaux",
			email: "geoffrey.papaux@master.hes-so.ch",
			statistics: {
				badge_count: 1
			}
		}
	]);
};

////////////////////////////////////////////////////////////////////////////////////
// Users
////////////////////////////////////////////////////////////////////////////////////

/**
 *
 * @param app
 * @param callback
 */
exports.findAllUsers = function (app, callback) {
	callback.send([
		{
			user_id: 1,
			login: "gpap",
			firstname: "geoffrey",
			lastname: "papaux",
			email: "geoffrey.papaux@master.hes-so.ch"
		},
		{
			user_id: 2,
			login: "vgri",
			firstname: "Vincent",
			lastname: "Grivel",
			email: "vincent.grivel@master.hes-so.ch"
		}
	]);
};

/**
 *
 * @param user
 * @param callback
 */
exports.findUserById = function (user, callback) {
	callback.send({
		user_id: user.user_id,
		login: "gpap",
		firstname: "geoffrey",
		lastname: "papaux",
		email: "geoffrey.papaux@master.hes-so.ch"
	});
};

/**
 *
 * @param user
 * @param callback
 */
exports.findUserBadgesByUserId = function (user, callback) {
	callback.send({
		user_id: user.user_id,
		badges_list: [
			{
				badge_id: 1,
				category_id: 1,
				name: "Super hero",
				icon: "blu.png"
			}
		]
	});
};

/**
 *
 * @param user
 * @param callback
 */
exports.createUser = function (user, callback) {
	user.user_id = 3;
	callback.success(201, "Successfully created user", user);
};

/**
 *
 * @param user
 * @param callback
 */
exports.updateUser = function (user, callback) {
	callback.success(200, "User was updated.", user);
};

/**
 *
 * @param user
 * @param callback
 */
exports.deleteUser = function (user, callback) {
	callback.success(200, "Successfully deleted user", user);
};

////////////////////////////////////////////////////////////////////////////////////
// Events
////////////////////////////////////////////////////////////////////////////////////

/**
 *
 * @param callback
 */
exports.findAllEvents = function (app, callback) {
	callback.send([
		{
			event_id: 1,
			type: 1,
			user: 1,
			issued: "2013-03-24"
		}
	]);
};

/**
 *
 * @param event
 * @param callback
 */
exports.findEventById = function (event, callback) {
	callback.send({
		event_id: event.event_id,
		type: 1,
		user: 1,
		issued: "2013-03-24"
	});
};

/**
 *
 * @param event
 * @param callback
 */
exports.createEvent = function (event, callback) {
	event.event_id = 3;
	callback.success(201, "Successfully created event", event);
};

////////////////////////////////////////////////////////////////////////////////////
// Event Types
////////////////////////////////////////////////////////////////////////////////////

/**
 *
 * @param callback
 */
exports.findAllEventTypes = function (app, callback) {
	callback.send([
		{
			type_id: 1,
			name: "commits"
		}
	]);
};

/**
 *
 * @param eventtype
 * @param callback
 */
exports.findEventTypeById = function (eventtype, callback) {
	callback.send({
		type_id: eventtype.type_id,
		name: "commits"
	});
};

/**
 * Saves a new event type
 * @param eventtype
 * @param callback
 */
exports.createEventType = function (eventtype, callback) {
	eventtype.type_id = 3;
	callback.success(201, "Successfully created event", eventtype);
};

/**
 * Updates event type
 * @param eventtype
 * @param callback
 */
exports.updateEventType = function (eventtype, callback) {
	callback.success(200, "Successfully created event", eventtype);
};


////////////////////////////////////////////////////////////////////////////////////
// Rules
////////////////////////////////////////////////////////////////////////////////////

/**
 *
 * @param app
 * @param callback
 */
exports.findAllRules = function (app, callback) {
	callback.send([
		{
			rule_id: 1,
			name: "sample rule",
			badge_id: 1,
			event_types: [
				{
					event_type: 1,
					threshold: 10
				}
			]
		}
	]);
};

/**
 *
 * @param rule
 * @param callback
 */
exports.findRuleById = function (rule, callback) {
	callback.send({
		rule_id: rule.ruleid,
		name: "sample rule",
		badge_id: 1,
		event_types: [
			{
				event_type: 1,
				threshold: 10
			}
		]
	});
};

/**
 * Saves a new rule
 * @param rule
 * @param callback
 */
exports.createRule = function (rule, callback) {
	rule.rule_id = 3;
	callback.success(201, "Successfully created rule", rule);
};

/**
 *
 * @param rule
 * @param callback
 */
exports.updateRule = function (rule, callback) {
	callback.success(200, "Successfully updated rule", rule);
};

/**
 *
 * @param rule
 * @param callback
 */
exports.deleteRule = function (rule, callback) {
	callback.success(200, "Successfully deleted rule", rule);
};

////////////////////////////////////////////////////////////////////////////////////
// Badges
////////////////////////////////////////////////////////////////////////////////////

/**
 *
 * @param app
 * @param callback
 */
exports.findAllBadges = function (app, callback) {
	callback.send([
		{
			badge_id: 1,
			category_id: 1,
			name: "bitcoin addicted",
			icon: "img/badge/bitcoin.png"
		},
		{
			badge_id: 2,
			category_id: 1,
			name: "github addicted",
			icon: "img/badge/github.jpg"
		}
	]);
};

/**
 *
 * @param badge
 * @param callback
 */
exports.findBadgeById = function (badge, callback) {
	callback.send({
		badge_id: badge.badge_id,
		category_id: 1,
		name: "bitcoin addicted",
		icon: "img/badge/bitcoin.png"
	});
};

/**
 * Saves a new badge
 * @param badge
 * @param callback
 */
exports.createBadge = function (badge, callback) {
	badge.badge_id = 3;
	callback.success(201, "Successfully created badge", badge);
};

/**
 *
 * @param badge
 * @param callback
 */
exports.updateBadge = function (badge, callback) {
	callback.success(200, "Badge was updated.", badge);
};

////////////////////////////////////////////////////////////////////////////////////
// Badge Categories
////////////////////////////////////////////////////////////////////////////////////

/**
 *
 * @param app
 * @param callback
 */
exports.findAllBadgeCategories = function (app, callback) {
	callback.send([
		{
			category_id: 1,
			name: "category name"
		},
		{
			category_id: 2,
			name: "grivelounet"
		}
	]);
};

/**
 *
 * @param category
 * @param callback
 */
exports.findBadgeCategoryById = function (category, callback) {
	callback.send({
		category_id: category.category_id,
		name: "category name"
	});
};

/**
 * Saves a new badge category
 * @param category
 * @param callback
 */
exports.createBadgeCategory = function (category, callback) {
	category.category_id = 3;
	callback.success(201, "Successfully created badge category", category);
};

/**
 *
 * @param category
 * @param callback
 */
exports.updateBadgeCategory = function (category, callback) {
	callback.success(200, "Successfully updated badge category", category);
};
