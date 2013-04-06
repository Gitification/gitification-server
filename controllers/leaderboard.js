////////////////////////////////////////////////////////////////////////////////////
////// Leaderboard
//////////////////////////////////////////////////////////////////////////////////////
'use strict';

// will be set by the controller using rewire
var db;

// a message factory, will be set by the controller using rewire
// var msg_fact; unused

exports.findAll = function (req, res/*, next*/ ) {
	var qres = db.findLeaderboard();

	res.send(qres);
};
