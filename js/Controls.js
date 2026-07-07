/**
 * @author mrdoob / http://mrdoob.com/
 */

import { UIButton, UIPanel, UIRow, UIText } from './libs/ui.js';

function Controls( editor ) {

	const player = editor.frame.player;
	const signals = editor.signals;

	var container = new UIPanel();
	container.setId( 'controls' );

	var row = new UIRow();
	row.setPadding( '6px' );
	container.add( row );

	var prevButton = new UIButton();
	prevButton.setBackground( 'url(files/prev.svg)' );
	prevButton.setWidth( '20px' );
	prevButton.setHeight( '20px' );
	prevButton.setMarginRight( '4px' );
	prevButton.setVerticalAlign( 'middle' );
	prevButton.onClick( function () {

		editor.setTime( player.currentTime - 1 );

	} );
	row.add( prevButton );

	var playButton = new UIButton();
	playButton.setBackground( 'url(files/play.svg)' );
	playButton.setWidth( '20px' );
	playButton.setHeight( '20px' );
	playButton.setMarginRight( '4px' );
	playButton.setVerticalAlign( 'middle' );
	playButton.onClick( function () {

		player.isPlaying ? editor.stop() : editor.play();

	} );
	row.add( playButton );

	var nextButton = new UIButton();
	nextButton.setBackground( 'url(files/next.svg)' );
	nextButton.setWidth( '20px' );
	nextButton.setHeight( '20px' );
	nextButton.setMarginRight( '4px' );
	nextButton.setVerticalAlign( 'middle' );
	nextButton.onClick( function () {

		editor.setTime( player.currentTime + 1 );

	} );
	row.add( nextButton );

	function ignoreKeys( event ) {

		switch ( event.keyCode ) {

			case 13: case 32: event.preventDefault();

		}

	};

	prevButton.onKeyDown( ignoreKeys );
	playButton.onKeyDown( ignoreKeys );
	nextButton.onKeyDown( ignoreKeys );

	var timeText = new UIText();
	timeText.setColor( '#bbb' );
	timeText.setWidth( '60px' );
	timeText.setMarginLeft( '10px' );
	timeText.setValue( '0:00.00' );
	row.add( timeText );

	function updateTimeText( value ) {

		var minutes = Math.floor( value / 60 );
		var seconds = value % 60;
		var padding = seconds < 10 ? '0' : '';

		timeText.setValue( minutes + ':' + padding + seconds.toFixed( 2 ) );

	}

	var playbackRateText = new UIText();
	playbackRateText.setColor( '#999' );
	playbackRateText.setMarginLeft( '8px' );
	playbackRateText.setValue( '1.0x' );
	row.add( playbackRateText );

	function updatePlaybackRate() {

		var rate = player.playbackRate || 0;
		playbackRateText.setValue( rate.toFixed( 1 ) + 'x' );

	}

	var fullscreenButton = new UIButton();
	fullscreenButton.setBackground( 'url(files/fullscreen.svg)' );
	fullscreenButton.setWidth( '20px' );
	fullscreenButton.setHeight( '20px' );
	fullscreenButton.setFloat( 'right' );
	fullscreenButton.setVerticalAlign( 'middle' );
	fullscreenButton.onClick( function () {

		editor.signals.fullscreen.dispatch();

	} );
	row.add( fullscreenButton );

	// Zoom

	var zoomInButton = new UIButton( '+' );
	zoomInButton.setWidth( '20px' );
	zoomInButton.setHeight( '20px' );
	zoomInButton.setFloat( 'right' );
	zoomInButton.setMarginRight( '4px' );
	zoomInButton.onClick( function () { signals.timelineZoomIn.dispatch(); } );
	row.add( zoomInButton );

	var zoomOutButton = new UIButton( '-' );
	zoomOutButton.setWidth( '20px' );
	zoomOutButton.setHeight( '20px' );
	zoomOutButton.setFloat( 'right' );
	zoomOutButton.setMarginRight( '4px' );
	zoomOutButton.onClick( function () { signals.timelineZoomOut.dispatch(); } );
	row.add( zoomOutButton );

	var zoomResetButton = new UIButton( 'R' );
	zoomResetButton.setWidth( '20px' );
	zoomResetButton.setHeight( '20px' );
	zoomResetButton.setFloat( 'right' );
	zoomResetButton.setMarginRight( '4px' );
	zoomResetButton.onClick( function () { signals.timelineZoomed.dispatch( 32 ); } );
	row.add( zoomResetButton );

	var zoomText = new UIText( '100%' );
	zoomText.setWidth( '40px' );
	zoomText.setFloat( 'right' );
	zoomText.setMarginRight( '10px' );
	zoomText.setColor( '#bbb' );
	zoomText.setTextAlign( 'right' );
	row.add( zoomText );

	//

	signals.playingChanged.add( function ( isPlaying ) {

		playButton.setBackground( isPlaying ? 'url(files/pause.svg)' : 'url(files/play.svg)' )

	} );

	signals.playbackRateChanged.add( function () {

		updatePlaybackRate();

	} );

	signals.timeChanged.add( function ( value ) {

		updateTimeText( value );

	} );

	signals.timelineZoomed.add( function ( scale ) {

		zoomText.setValue( Math.round( ( scale / 32 ) * 100 ) + '%' );

	} );

	signals.editorCleared.add( function () {

		updatePlaybackRate();

	} );

	return container;

}

export { Controls };
