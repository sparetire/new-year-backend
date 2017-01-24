const bodyParser = require('koa-bodyparser');

// 就这一个方法，蠢点就蠢点算了
function percent(opts) {
	return async(ctx, next) => {
		let score = parseInt(ctx.request.body.score, 10);
		if (isNaN(score)) {
			ctx.body = {
				error: 'Invalid param'
			};
			return;
		}
		let user = ctx.db.collection('user');
		let total = await user.find()
			.count();
		if (total === 0) {
			ctx.body = {
				percent: 1,
				hasGift: 1
			};
			process.nextTick(() => {
				user.insertOne({
					score
				});
			});
			return;
		}
		let lower = await user.find({
				score: {
					$lte: score
				}
			})
			.count();
		let percent = lower / total;
		let hasGift = 0;
		if (score === 100) {
			let giftCount = await user.find({
					score: 100
				})
				.count();
			if (giftCount < 3) {
				hasGift = 1;
			}
		}
		process.nextTick(() => {
			user.insertOne({
				score
			});
		});
		ctx.body = {
			percent,
			hasGift
		};
	};
}

module.exports = {
	'post /percent': [bodyParser(), percent()]
};