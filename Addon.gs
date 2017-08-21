/**
 * Runs when the add-on is installed.
 *
 * @param {object} e The event parameter for a simple onInstall trigger. To
 *     determine which authorization mode (ScriptApp.AuthMode) the trigger is
 *     running in, inspect e.authMode. (In practice, onInstall triggers always
 *     run in AuthMode.FULL, but onOpen triggers may be AuthMode.LIMITED or
 *     AuthMode.NONE.)
 */
function onInstall() {
  onOpen();
}

/**
 * Creates a menu entry in the Google Docs UI when the document is opened.
 *
 * @param {object} e The event parameter for a simple onOpen trigger. To
 *     determine which authorization mode (ScriptApp.AuthMode) the trigger is
 *     running in, inspect e.authMode.
 */
function onOpen( e ) {
  SpreadsheetApp.getUi()
    .createAddonMenu()
    .addItem( 'Manage Sheets', 'showSidebar' )
    .addToUi();
}

/**
 * Opens a sidebar in the document containing the add-on's user interface.
 */
function showSidebar() {
  var ui = HtmlService.createTemplateFromFile( 'Sidebar' )
    .evaluate()
    .setSandboxMode( HtmlService.SandboxMode.IFRAME )
    .setTitle( 'Sheet Manager' );
  SpreadsheetApp.getUi()
    .showSidebar( ui );
}

// Helper function that puts external JS / CSS into the HTML file.
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}

/**
* used to expose memebers of a namespace
* @param {string} namespace name
* @param {method} method name
*/
function exposeRun (namespace, method , argArray ) {
  var func = (namespace ? this[namespace][method] : this[method])
  if (argArray && argArray.length) {
    return func.apply(this,argArray);
  }
  else {
    return func();
  }
}