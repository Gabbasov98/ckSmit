/*
	By Osvaldas Valutis, www.osvaldas.info
	Available for use under the MIT License
*/

'use strict';

;( function( $, window, document, undefined )
{
	$( '.inputfile' ).each( function()
	{
		var $input	 = $( this ),
			$label	 = $input.next( 'label' ),
			labelVal = $label.html();

		$input.on( 'change', function( e )
		{
			var fileName = '';

			if( this.files && this.files.length > 1 ){
				fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
				$('.removefile').addClass('active');
				$('.flexinputfile').addClass('hij');
			}
			else if( e.target.value ){
				fileName = e.target.value.split( '\\' ).pop();

				$('.flexinputfile').removeClass('hij');
			}

			if( fileName ){
				$label.find( 'span' ).html( fileName );
				$('.removefile').addClass('active');
				$('.flexinputfile').addClass('hij');
			}
			else{
				$label.html( labelVal );
				$('.flexinputfile').removeClass('hij');
			}
		});

		// Firefox bug fix
		$input
		.on( 'focus', function(){ $input.addClass( 'has-focus' ); })
		.on( 'blur', function(){ $input.removeClass( 'has-focus' ); });
	});
})( jQuery, window, document );