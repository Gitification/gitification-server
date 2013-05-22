// Dacleaner machine
'use strict';

var db = require('riak-js').getClient();
var async = require('async');

var prefix = "gitification_";

var delete_key = function (bucket, key, callback) {
	db.remove(bucket, key, function (err) {
		console.log("removed: " + bucket + "/" + key + ", with error " + err);
		callback();
	});
};

var delete_keys = function (bucketname, keys, callback) {
	async.each(keys, function (key, cb) {
		delete_key(bucketname, key, cb);
	}, function (err) {
		if (err) { console.log("error" + err); }
		callback();
	}
	);
};


function isBucketOur(element/*, index, array*/) {
	return (element.substring(0, prefix.length) === prefix);
}


function delete_buckets(err, buckets) {
	var ourBuckets = buckets.filter(isBucketOur);
	console.log("our buckets: " + ourBuckets);

	async.eachSeries(ourBuckets, function (bucket, cb) {
		var stream, keys;
		stream = db.keys(bucket, {keys: 'stream'});
		keys = [];
		stream.on('keys', function (someKeys) {
			keys = keys.concat(someKeys);
		}).on('end', function (/*data*/) {
			delete_keys(bucket, keys, cb);
		}).start();
	}, function (err) {
		if (err) { console.log("error" + err); }
		console.log("finished");
	}
	);
}

db.buckets(delete_buckets);



