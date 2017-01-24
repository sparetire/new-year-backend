const fs = require('fs');
const path = require('path');
const CONTROLLER_DIR = path.resolve(__dirname, './controllers');

function addMapping(router, mapping) {
	let pathname = '',
		method = '',
		tmp = null,
		param = null;
	for (let key in mapping) {
		tmp = key.split(/\s+/);
		method = tmp[0];
		pathname = tmp[1];
		param = Array.prototype.concat(pathname, mapping[key]);
		router[method].apply(router, param);
	}
}

function addControllers(router, dir) {
	let files = fs.readdirSync(dir);
	let jsFiles = files.filter(f => f.endsWith('.js'));
	let mapping = null;

	for (let f in jsFiles) {
		console.log(`processing controller: ${jsFiles[f]}...`);
		mapping = require(path.resolve(CONTROLLER_DIR, jsFiles[f]));
		addMapping(router, mapping);
	}
}

module.exports = function (router, dir) {
	let controllersDir = dir || CONTROLLER_DIR;
	addControllers(router, controllersDir);
	return router.routes();
};