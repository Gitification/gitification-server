////////////////////////////////////////////////////////////////////////////////////
////// Users
////////////////////////////////////////////////////////////////////////////////////
'use strict';

// our database, will be set by the controller using rewire
var db;

// a message factory, will be set by the controller using rewire
var msg_fact;


exports.findAll = function (req, res/*, next*/) {
	var qres;
	
	qres = db.findAllUsers();
	
	res.send(qres);
};

exports.findById = function (req, res/*, next*/) {
	var userid, qres;
	
	userid = req.params.userid;
	qres = db.findUserById(userid);
	
	res.send(qres);
};

exports.findBadgesById = function (req, res/*, next*/) {
	var userid, qres;
	
	userid = req.params.userid;
	qres = db.findUserBadgesByUserId(userid);
	
	res.send(qres);
};

exports.create = function (req, res/*, next*/) {
	var login, firstname, lastname, email, userid, payload;

	login = req.params.login;
	firstname = req.params.firstname;
	lastname = req.params.lastname;
	email = req.params.email;
	
	userid = db.createUser(login, firstname, lastname, email);
	payload = {	user_id: userid };
	
	res.send(msg_fact.success("Successfully added.", payload));
};


exports.update = function (req, res/*, next*/) {
	var userid, login, firstname, lastname, email;
	
	userid = req.params.user_id;
	login = req.params.login;
	firstname = req.params.firstname;
	lastname = req.params.lastname;
	email = req.params.email;
	
	db.udpateUser(userid, login, firstname, lastname, email);
	
	res.send(msg_fact.success("User was updated.", ""));
};

exports.remove = function (req, res/*, next*/) {
	var userid;
	
	userid = req.params.userid;

	db.deleteUser(userid);
	
	res.send(msg_fact.success("User was deleted.", ""));
};
