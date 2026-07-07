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

  const start = Date.now();

  const result = EventService.read();

  console.log(
    "SERVER readEvents:",
    Date.now() - start,
    "ms"
  );

  return result;
};