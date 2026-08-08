/* exported doGet, include, readTournaments */
/* global CONFIG, TournamentService */

function doGet() {
  const template = HtmlService.createTemplateFromFile("Index");

  template.version = CONFIG.APP_VERSION;

  return template.evaluate().setTitle(CONFIG.APP_NAME);
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function readTournaments() {
  return TournamentService.read();
}
