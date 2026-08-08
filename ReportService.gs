/* exported ReportService */
/* global CONFIG */

const ReportService = {

  write(issues) {

    const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);

    let sheet = ss.getSheetByName("Contrôles");

    if (!sheet) {
      sheet = ss.insertSheet("Contrôles");
    }

    sheet.clear();

    sheet.getRange(1, 1, 1, 4).setValues([[
      "Niveau",
      "Ligne",
      "Champ",
      "Message"
    ]]);

    if (issues.length === 0) {
      return;
    }

    const rows = issues.map(issue => ([
      issue.level,
      issue.row,
      issue.field,
      issue.message
    ]));

    sheet
      .getRange(2, 1, rows.length, 4)
      .setValues(rows);
  }
};