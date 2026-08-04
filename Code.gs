function doGet() {
  return HtmlService
    .createTemplateFromFile("Index")
    .evaluate()
    .setTitle(CONFIG.APP_NAME);
}

function include(filename) {
  return HtmlService
    .createHtmlOutputFromFile(filename)
    .getContent();
}

function readTournaments() {
  return TournamentService.read();
};
