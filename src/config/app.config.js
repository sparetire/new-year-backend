module.exports = process.env.NODE_ENV === 'dev' ? {
	port: 3000,
	mongodb: {
		username: 'lusir',
		password: 'xjs2328038',
		host: 'localhost',
		port: '8588',
		dbName: 'new',
		minPollSize: 5,
		maxPollSize: 10
	}
} : {
	port: 80,
	mongodb: {
		username: 'lusir',
		password: 'xjs2328038',
		host: 'localhost',
		port: '8588',
		dbName: 'new',
		minPollSize: 5,
		maxPollSize: 10
	}
};