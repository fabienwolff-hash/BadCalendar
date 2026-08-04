function onOpen() {

  SpreadsheetApp.getUi()
    .createMenu(CONFIG.APP_NAME)
    .addItem("Vérifier le Master", "verifyMaster")
    .addToUi();

}

function verifyMaster() {

  const rows = TournamentService.readRows_();

  const issues = ValidationService.validate(rows);

  ReportService.write(issues);

}