const URL = require('url');
const QueryString = require('querystring');
const MongoClient = require('mongodb')
	.MongoClient;
const util = require('./util');

let DBFactory = {};

DBFactory.stringify = function (opts) {
	let conf = {};
	Object.assign(conf, opts);
	let urlObj = {
		protocol: 'mongodb',
		slashes: true,
		auth: `${conf.username}:${conf.password}`,
		hostname: conf.host,
		port: conf.port,
		pathname: `/${conf.dbName}`
	};
	delete conf.username;
	delete conf.password;
	delete conf.host;
	delete conf.port;
	delete conf.dbName;

	let qs = QueryString.stringify(conf);
	let url = URL.format(urlObj);

	if (util.isEmptyStr(qs)) {
		return url;
	} else {
		return `${url}?${qs}`;
	}

};

DBFactory.getClient = function (opts) {
	let url = DBFactory.stringify(opts);
	return MongoClient.connect(url).then(db => {
		console.log('MongoDB is connected');
		db.url = url;
		db.name = opts.dbName;
		return db;
	}, err => {
		console.log('MongoDB connect error:');
		return err;
	});
};

module.exports = DBFactory;