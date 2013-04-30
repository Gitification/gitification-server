'use strict';

var alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
var alphanum = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
var domain_ext = ["ch", "com", "fr", "en", "us", "gov", "ru", "net", "it"];

// [ 0, max [
function rnd(max) {
	return Math.floor(Math.random() * max);
}

function makerandomtext(dataset, size) {
	var text, i;

	text = "";

	for (i = 0; i < size; i++) {
		text += dataset.charAt(rnd(dataset.length));
	}

	return text;
}

function makerandomdomain() {
	return domain_ext[rnd(domain_ext.length)];
}

exports.makenum = rnd;

exports.makealpha = function (size) {
	return makerandomtext(alpha, size);
};

exports.makealphanum = function (size) {
	return makerandomtext(alphanum, size);
};


exports.makeurl = function (sizebefore) {
	return makerandomtext(alpha, sizebefore) + '.' + makerandomdomain();
};

exports.makedate = function (start, end) {
	return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};
