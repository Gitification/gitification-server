
////////////////////////////////////////////////////////////////////////////////////
////// Users
////////////////////////////////////////////////////////////////////////////////////


exports.findAll = function (req, res, next) {
	res.send([
		{
			user_id:1,
			login:"gpap",
			firstname:"geoffrey",
			lastname:"papaux",
			email:"geoffrey.papaux@master.hes-so.ch"
		}

	]);
}




exports.findById = function (req, res, next) {
	res.send({
		user:
		{
			user_id: req.params.userid,
			login:"gpap",
			firstname:"geoffrey",
			lastname:"papaux",
			email:"geoffrey.papaux@master.hes-so.ch"
		}
	});
}


exports.findBadgesById = function (req, res, next) {
	res.send({

		user_id:1, 
		badges_list:
		[
			{
				badge_name:"mother fucker"
			}
		]

	});
}



exports.create = function (req, res, next) {

	res.send({

		code:"success",
		message:"Successfully added",
		payload:
		{
                        user_id:1,
                        login:"gpap",
                        firstname:"geoffrey",
                        lastname:"papaux",
                        email:"geoffrey.papaux@master.hes-so.ch"
		}

	});

}
