/*global SheetManager, SpreadsheetApp */
/*jslint white:true */
/*eslint indent: "error"*/

/*
 * Returns an array of sheet objects with the hidden status of each.
 */
SheetManager.getShowHideStates = function () {

  var ss = SpreadsheetApp.getActiveSpreadsheet(),
        sheets = ss.getSheets(),
    sheetStatus = [];

  sheetStatus = sheets.map( function ( sheet ) {
    // var sheet = ss.getSheets()[0];

    var protections = [ {
      type: 'Sheet',
      scope: ( sheet.getProtections( SpreadsheetApp.ProtectionType.SHEET ) || [] )
        .filter( SheetManager.protectionFilter )
    }, {
      type: 'Range',
      scope: sheet.getProtections( SpreadsheetApp.ProtectionType.RANGE )
        .filter( SheetManager.protectionFilter )
    } ].reduce( function ( protections, p ) {
      if ( p.scope.length > 0 ) {
        protections.push( p.type );
      }
      return protections;
    }, [] );

    var sheetObject = {
      "name": sheet.getName(),
      "hidden": sheet.isSheetHidden(),
      "protections": protections,
      "id": sheet.getIndex()
    };

    return sheetObject;
  } );

  return sheetStatus;
}

SheetManager.protectionFilter = function ( protection ) { // var protection = sheet.getProtections(SpreadsheetApp.ProtectionType.RANGE)[0];
  // Only return those sheets that are not editable by the current user or have ranges not editable by the current user.
  return !protection.canEdit();
}

SheetManager.toggleSheet = function ( name, index ) {

  var ss = SpreadsheetApp.getActiveSpreadsheet();

  var sheet = ss.getSheetByName( name );

  if ( sheet.isSheetHidden() ) {

    sheet.showSheet();
    return 'shown';
  } else {
    sheet.hideSheet();
    return 'hidden';

  }
}

function testGetShowHideState() {

  var list = SheetManager.getShowHideStates();
  debugger;
}
