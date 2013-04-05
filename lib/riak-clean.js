// Dacleaner machine
'use strict';

var db = require('riak-js').getClient();

var prefix = "gitification_";

var delete_key = function (bucket, key) {
	db.remove(bucket, key);
	console.log("remove: " + bucket + "/" + key);
};

var delete_keys = function (bucketname, keys) {
	keys.forEach(
		function (key) {
			delete_key(bucketname, key);
		});
};


function isBucketOur(element/*, index, array*/) {
	return (element.substring(0, prefix.length) === prefix);
}


db.buckets(function (err, buckets) {
	var ourBuckets = buckets.filter(isBucketOur);
	console.log("our buckets: " + ourBuckets);
	ourBuckets.forEach(
		function (bucket) {
			db.keys(bucket, { keys: 'stream' }).on('keys', function (streamer) {
				delete_keys(bucket, streamer);
			}).start();
		});
});



