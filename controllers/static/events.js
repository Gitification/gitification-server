////////////////////////////////////////////////////////////////////////////////////
////// Events
////////////////////////////////////////////////////////////////////////////////////


exports.findAll = function (req, res, next) {
	res.send([
		{
			event_id:1,
			type:1,
			user:1,
			issued:"2013-03-24"
		}

	]);
}




exports.findById = function (req, res, next) {
	var eventid = req.params.userid;

	res.send({
		user:
		{
			event_id:eventid,
			type:1,
			user:1,
			issued:"2013-03-24"
		}
	});
}




exports.create = function (req, res, next) {

	res.send({
		code:"success",
		message:"Successfully added",
		payload:
		{
			"event_id":1
		}
	});
}

