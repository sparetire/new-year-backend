function cors(opts) {
	return async (ctx, next) => {
		ctx.set('Access-Control-Allow-Origin', '*');
		ctx.set('Access-Control-Request-Method', 'GET,POST,PUT,DELETE,OPTIONS');
		ctx.set('Access-Control-Request-Headers', 'Content-Type,Content-LengthAccept,Accept-Charset,Accept-Encoding,Authorization,X-Requested-With,Token');
		ctx.set('Access-Control-Max-Age', '7200');
		await next();
	};
}

module.exports = cors;