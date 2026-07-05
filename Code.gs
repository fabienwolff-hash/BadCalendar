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

function readEvents() {
  return EventService.read();
}

function getConfig() {
  return {
    filters: {
      all: CONFIG.FILTERS.ALL
    }
  }
};