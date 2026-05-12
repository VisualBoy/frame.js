/**
 * @author mrdoob / http://mrdoob.com/
 */

import { UIPanel } from './libs/ui.js';

function MenubarEdit( editor ) {

	var container = new UIPanel();
	container.setClass( 'menu' );

	var title = new UIPanel();
	title.setClass( 'title' );
	title.setTextContent( 'Edit' );
	container.add( title );

	//

	var options = new UIPanel();
	options.setClass( 'options' );
	container.add( options );

	// undo

	var undo = new UIPanel();
	undo.setClass( 'option' );
	undo.setTextContent( 'Undo' );
	undo.addClass( 'inactive' );
	undo.onClick( function () {

		editor.undo();

	} );
	options.add( undo );

	// redo

	var redo = new UIPanel();
	redo.setClass( 'option' );
	redo.setTextContent( 'Redo' );
	redo.addClass( 'inactive' );
	redo.onClick( function () {

		editor.redo();

	} );
	options.add( redo );

	options.add( new UIPanel().setClass( 'divider' ) );

	editor.signals.historyChanged.add( function () {

		const history = editor.history;

		history.undoStack.length > 1 ? undo.removeClass( 'inactive' ) : undo.addClass( 'inactive' );
		history.redoStack.length > 0 ? redo.removeClass( 'inactive' ) : redo.addClass( 'inactive' );

	} );

	// duplicate

	var option = new UIPanel();
	option.setClass( 'option' );
	option.setTextContent( 'Duplicate' );
	option.onClick( function () {

		if ( editor.selected === null ) return;

		editor.duplicateAnimation( editor.selected );

	} );
	options.add( option );

	// remove

	var option = new UIPanel();
	option.setClass( 'option' );
	option.setTextContent( 'Remove' );
	option.onClick( function () {

		if ( editor.selected === null ) return;

		editor.removeAnimation( editor.selected );
		editor.selectAnimation( null );

	} );
	options.add( option );

	return container;

}

export { MenubarEdit };
