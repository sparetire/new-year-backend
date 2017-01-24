const bodyParser = require('koa-bodyparser');

function demo(opts) {
	return async (ctx, next) => {
		console.log(ctx.request.body);
		console.log(ctx.params.id);
		console.log(ctx.request.query.name);
		ctx.body = {
			name: 'demo'
		};
	};
}

module.exports = {
	'post /demo/:id': [bodyParser(), demo()]
};