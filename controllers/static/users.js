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
	var userid = req.params.userid;

	res.send({
		user_id: userid,
		login:"gpap",
		firstname:"geoffrey",
		lastname:"papaux",
		email:"geoffrey.papaux@master.hes-so.ch"
	});
}


exports.findBadgesById = function (req, res, next) {
	var userid = req.params.userid;

	res.send({
		user_id:userid, 
		badges_list:
		[
			{
				badge_name:"super hero"
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

					

exports.update = function (req, res, next) {

	var userid = req.params.userid;

	res.send({
		code:"success", 
		message:"User was updated." 
	});
}




exports.remove = function (req, res, next) {

	var userid = req.params.userid;
	res.send({
		code:"success",
		message:"User was deleted."

	});
}
