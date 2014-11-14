var $ = require( 'jquery' );

$( 'body' ).append(
	$( '<h1>' )
		.text( 'Example Package B' )
		.addClass( 'example-package-b' )
);

module.exports = 'B';
