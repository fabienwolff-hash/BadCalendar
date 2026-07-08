function onOpen() {

  SpreadsheetApp.getUi()
    .createMenu(CONFIG.APP_NAME)
    .addItem("Vérifier le Master", "verifyMaster")
    .addToUi();

},

function verifyMaster() {

}