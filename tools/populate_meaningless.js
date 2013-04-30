'use strict';

var r = require('./randomizator');
var c = require('./client_http');
var i;
var req;
var appid;

// parameters setting the number of objects created
var app_nb = 20;
var user_nb = 20;
var event_type_nb = 20;
var event_nb = 20;
var rule_nb = 20;
var rule_max_nb_event_types_per_rule = 20;
var badge_nb = 20;
var badge_cat_nb = 20;

// debugging (console output) enabled or disabled ?
var debug = false;




// application random parameters
/*
function rndFromArray(arr) {
	return arr[r.makenum(arr.length)];
}
*/

/////////////////////////////////////////////
// Generate random applications
/////////////////////////////////////////////
console.log();
console.log('====================');
console.log('Creating Applications');
console.log('====================');
for (i = 0; i < app_nb; i++) {
	var site, callback, admin;
	site = r.makeurl(20);
	callback = r.makeurl(20);
	admin = "adm" + r.makealpha(15) + '@' + r.makeurl(10);

	req = {'site': site, 'callback': callback, 'admin': admin};

	c.createApplication(req);

	if (debug) {
		console.log(req);
	}
}


/////////////////////////////////////////////
// Generate random users
/////////////////////////////////////////////
console.log();
console.log('====================');
console.log('Creating Users');
console.log('====================');
for (i = 0; i < user_nb; i++) {
	var login, firstname, lastname, email;
	login = r.makealpha(10);
	firstname = r.makealpha(15);
	lastname = r.makealpha(15);
	email = firstname + '.' + lastname + '@' + r.makeurl(15);

	req = {'login': login, 'firstname': firstname, 'lastname': lastname, 'email': email};

	appid = r.makenum(app_nb);
	c.createUser(appid, req);

	if (debug) {
		console.log(req);
	}
}


/////////////////////////////////////////////
// Generate random event types
/////////////////////////////////////////////
console.log();
console.log('====================');
console.log('Creating Event types');
console.log('====================');
for (i = 0; i < event_type_nb; i++) {
	var evname;

	evname = r.makealpha(10);

	req = {'name': evname};

	appid = r.makenum(app_nb);
	c.createEventType(appid, req);


	if (debug) {
		console.log(req);
	}
}



/////////////////////////////////////////////
// Generate random events
/////////////////////////////////////////////
console.log();
console.log('====================');
console.log('Creating Events');
console.log('====================');
for (i = 0; i < event_nb; i++) {
	var evtype, user, issued;

	evtype = r.makenum(event_type_nb); // TODO c'est bien son id ca ?
	user = r.makenum(user_nb); // TODO c'est bien son id ca ?
	issued = r.makedate(new Date(2010, 0, 1), new Date());

	req = {'type': evtype, 'user': user, 'issued': issued};

	appid = r.makenum(app_nb);
	c.createEvent(appid, req);


	if (debug) {
		console.log(req);
	}
}


/////////////////////////////////////////////
// Generate random badge categories
/////////////////////////////////////////////
console.log();
console.log('====================');
console.log('Creating Badge categories');
console.log('====================');
for (i = 0; i < badge_cat_nb; i++) {
	var bcname;

	bcname = r.makealpha(15);

	req = {'name': bcname};

	appid = r.makenum(app_nb);
	c.createBadgeCategory(appid, req);


	if (debug) {
		console.log(req);
	}
}



/////////////////////////////////////////////
// Generate random badges
/////////////////////////////////////////////
console.log();
console.log('====================');
console.log('Creating Badges');
console.log('====================');
for (i = 0; i < badge_nb; i++) {
	var bname, icon, category_id;

	bname = r.makealpha(10);
	icon = 'http://' + r.makealpha(10) + r.makeurl(15);
	category_id = r.makenum(badge_cat_nb);

	req = {'name': bname, 'icon': icon, 'category_id': category_id};

	appid = r.makenum(app_nb);
	c.createBadge(appid, req);


	if (debug) {
		console.log(req);
	}
}




/////////////////////////////////////////////
// Generate random rules
/////////////////////////////////////////////
console.log();
console.log('====================');
console.log('Creating Rules');
console.log('====================');
for (i = 0; i < rule_nb; i++) {
	var rname, badge, event_types, event_type, threshold, nb_events, j;

	rname = r.makealpha(15);
	badge = r.makenum(badge_nb);
	event_types = [];
	nb_events = r.makenum(rule_max_nb_event_types_per_rule) + 1; // avoid 0

	for (j = 0; j < nb_events; j++) {
		event_type = r.makenum(event_type_nb);
		threshold = r.makenum(1000);
		event_types[j] = {'event_type': event_type, 'threshold': threshold};
	}

	req = {'name': rname, 'badge_id': badge, 'event_types': event_types};

	appid = r.makenum(app_nb);
	c.createRule(appid, req);


	if (debug) {
		console.log(req);
	}
}


