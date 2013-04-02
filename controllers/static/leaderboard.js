////////////////////////////////////////////////////////////////////////////////////
////// Leaderboard
//////////////////////////////////////////////////////////////////////////////////////

exports.findAll = function (req, res, next) {
	res.send([
		{
			position:1,
			user_id:0,
			login:"gpap",
			firstname:"geoffrey",
			lastname:"papaux",
			email:"geoffrey.papaux@master.hes-so.ch",
			statistics:
			{
				badge_count:1,
			}
		}
	]);
}


