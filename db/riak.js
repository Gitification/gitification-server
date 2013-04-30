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
var bPrefix = "gitification_"; // set a prefix for all the bucket used by this application

////////////////////////////////////////////////////////////////////////////////////
// Application
////////////////////////////////////////////////////////////////////////////////////

exports.findAllApplications = function (cb) {
	rc.getAll(bPrefix + "application", function (err, result/*, meta*/) {
		cb.send(result);
	});
};


/*
exports.findApplicationById = function (id) {
	return {
		application_id: id,
		site: "sample",
		callback: "callback",
		created_at: "20130327",
		admin: "admin",
		statistics:
		{
			user_count: 1,
			event_count: 1,
			badge_count: 1,
			rule_count: 1
		}
	};
};
*/

exports.createApplication = function (site/*, callback, admin*/) {
	rc.save(bPrefix + "application", site, {site: site});
	return site;
};


////////////////////////////////////////////////////////////////////////////////////
// Leaderboard
////////////////////////////////////////////////////////////////////////////////////
/*
exports.findLeaderboard = function () {
	return [
		{
			position: 1,
			user_id: 0,
			login: "gpap",
			firstname: "geoffrey",
			lastname: "papaux",
			email: "geoffrey.papaux@master.hes-so.ch",
			statistics:
			{
				badge_count: 1,
			}
		}
	];
};
*/
////////////////////////////////////////////////////////////////////////////////////
// Users
////////////////////////////////////////////////////////////////////////////////////
/*
exports.findAllUsers = function () {
	return [
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
	];
};
*/
/*
exports.findUserById = function (userid) {
	return {
		user_id:  userid,
		login: "gpap",
		firstname: "geoffrey",
		lastname: "papaux",
		email: "geoffrey.papaux@master.hes-so.ch"
	};
};
*/

exports.findUserBadgesByUserId = function (userid) {
	return {
		user_id: userid,
		badges_list:
		[
			{
				badge_name: "super hero"
			}
		]

	};
};

/**
 * save a new user.
 * returns the userid
 */
 /*
exports.createUser = function (login, firstname, lastname, email) {
	var userid = 3;

	console.log("Create user {" + login + ", " + firstname + ", " +
		lastname + ", " + email + "}");

	return userid;
};
*/

/*
exports.updateUser = function (userid, login, firstname, lastname, email) {
	console.log("Update user {" + userid + ", " + login + ", " + firstname + ", " +
		lastname + ", " + email + "}");
	return true;
};
*/
/*
exports.deleteUser = function (userid) {
	console.log("Delete user {" + userid + "}");
	return true;
};
*/
////////////////////////////////////////////////////////////////////////////////////
// Events
////////////////////////////////////////////////////////////////////////////////////
/*
exports.findAllEvents = function () {
	return [
		{
			event_id: 1,
			type: 1,
			user: 1,
			issued: "2013-03-24"
		}
	];
};
*/
/*
exports.findEventById = function (eventid) {
	return {
		event_id: eventid,
		type: 1,
		user: 1,
		issued: "2013-03-24"
	};
};
*/
/**
 * save a new event
 * Return the event id
 */
/*
exports.createEvent = function (type, user, issued) {
	var eventid = 3;

	console.log("Create event {" + type + ", " + user + ", " + issued + "}");

	return eventid;
};
*/
////////////////////////////////////////////////////////////////////////////////////
// Event Types
////////////////////////////////////////////////////////////////////////////////////
/*
exports.findAllEventTypes = function () {
	return [
		{
			type_id: 1,
			name: "commits"
		}
	];
};
*/
/*
exports.findEventTypeById = function (eventtypeid) {
	return {
		type_id: eventtypeid,
		name: "commits"
	};
};
*/
/**
 * save a new event type
 * Return the event type id
 */
/*
exports.createEventType = function (event_type_name) {
	var event_type_id;

	console.log("Create event type {" + event_type_name + "}");
	event_type_id = 3;

	return event_type_id;
};
*/
////////////////////////////////////////////////////////////////////////////////////
// Rules
////////////////////////////////////////////////////////////////////////////////////
/*
exports.findAllRules = function () {
	return [
		{
			rule_id: 1,
			name: "sample rule",
			badge: 1,
			event_types:
			[
				{
					event_type: 1,
					threshold: 10
				}
			]
		}
	];
};
*/
/*
exports.findRuleById = function (ruleid) {
	return {
		rule_id: ruleid,
		name: "sample rule",
		badge: 1,
		event_types:
		[
			{
				event_type: 1,
				threshold: 10
			}
		]
	};
};
*/
/**
 * save a new rule
 * Return the rule id
 */
/*
exports.createRule = function (name, badge, event_types) {
	var ruleid;

	console.log("Create rule {" + name + ", " + badge + ", " + event_types + "}");
	ruleid = 3;

	return ruleid;
};
*/
/*
exports.updateRule = function (ruleid, name, badge, event_types) {

	console.log("Update rule {" + ruleid + ", " + name + ", " +
			badge + ", " + event_types + "}");

	return true;
};
*/
/*
exports.deleteRule = function (ruleid) {
	console.log("Delete rule {" + ruleid + "}");
	return true;
};
*/
////////////////////////////////////////////////////////////////////////////////////
// Badges
////////////////////////////////////////////////////////////////////////////////////
/*
exports.findAllBadges = function () {
	return [
		{
			badge_id: 1,
			category_id: 1,
			name: "badge name",
			icon: "path/to/icon.png"
		}
	];
};
*/
/*
exports.findBadgeById = function (badgeid) {
	return {
		badge_id: badgeid,
		category_id: 1,
		name: "badge name",
		icon: "path/to/icon.png"
	};
};
*/
/**
 * save a new badge
 * Return the badge id
 */
/*
exports.createBadge = function (name, icon, category_id) {
	var badgeid;

	console.log("Create badge {" + name + ", " + icon + ", " + category_id + "}");

	badgeid = 3;
	return badgeid;
};
*/
/*
exports.updateBadge = function (badgeid, name, icon, category_id) {

	console.log("Update badge {" + badgeid + ", " + name + ", " +
			icon + ", " + category_id + "}");

	return true;
};
*/
////////////////////////////////////////////////////////////////////////////////////
// Badge Categories
////////////////////////////////////////////////////////////////////////////////////
/*
exports.findAllBadgeCategories = function () {
	return [
		{
			category_id: 1,
			name: "category name"
		}
	];
};
*/
/*
exports.findBadgeCategoryById = function (categoryid) {
	return {
		category_id: categoryid,
		name: "category name"
	};
};
*/
/**
 * save a new badge
 * Return the badge id
 */
/*
exports.createBadgeCategory = function (name) {
	var categoryid;

	console.log("Create badge category {" + name + "}");

	categoryid = 3;
	return categoryid;
};
*/
/*
exports.updateBadge = function (categoryid, name) {

	console.log("Update badge category {" + categoryid + ", " + name + "}");

	return true;
};
*/
