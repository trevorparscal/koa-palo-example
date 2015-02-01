var koa = require( 'koa' ),
	mount = require( 'koa-mount' ),
	route = require( 'koa-route' ),
	path = require( 'path' ),
	fs = require( 'co-fs' ),
	app = module.exports = koa(),
	client = path.join( process.cwd(), 'client' );

app
	.use( require( 'koa-gzip' )() )
	.use( require( 'koa-error' )() )
	.use( require( 'koa-logger' )() )
	/*
	.use( require( 'koa-redis-cache' )( {
		routes: [
			{
				path: '/palo/startup',
				expires: 60 * 5 // 5 minutes, allows changes to propagate quickly
			},
			{
				path: '/palo/(.*)',
				expires: 315360000 // about 10 years, will be cache-busted using version numbers
			}
		]
	} ) )
	*/
	.use( mount( '/palo', require( 'koa-palo' )( client, '/client' ) ) )
	.use( mount( '/client', require( 'koa-static' )( client ) ) )
	.use( route.get( '/', function *() {
		this.type = '.html';
		this.body = yield fs.readFile( './server/index.html' );
	} ) );

if ( !module.parent ) {
	app.listen( 3000 );
}
