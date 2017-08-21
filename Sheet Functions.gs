/*
 * Returns an array of sheet objects with the hidden status of each.
 */
function getShowHideStates() {

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  var sheets = ss.getSheets();
  
  var sheetStatus = sheets.map(function(sheet, i, arr) {
    // var sheet = ss.getSheets()[0];
  
    return {
      "name": sheet.getName(),
      "hidden": sheet.isSheetHidden(),
      "protected": {
        "sheet": (sheet.getProtections(SpreadsheetApp.ProtectionType.SHEET) || []).filter(function(protection) { // var protection = sheet.getProtections(SpreadsheetApp.ProtectionType.SHEET)[0];
          
          // Only return those sheets that are not editable by the current user.
          return !protection.canEdit();
        }).length > 0,
        "ranges": (sheet.getProtections(SpreadsheetApp.ProtectionType.RANGE) || []).filter(function(protection) { // var protection = sheet.getProtections(SpreadsheetApp.ProtectionType.RANGE)[0];
          return !protection.canEdit();
        }).length > 0
      },
      "id": sheet.getIndex()
    }
  });
  
  return sheetStatus;
}