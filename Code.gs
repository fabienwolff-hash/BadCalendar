const CONFIG = {
  spreadsheetId: PropertiesService.getScriptProperties().getProperty("SPREADSHEET_ID"),
  sheetName: "Master"
};

function doGet(){
  return HtmlService
    .createTemplateFromFile("Index")
    .evaluate()
    .setTitle("Calendrier Jeunes")
    .addMetaTag("viewport","width=device-width, initial-scale=1");
}

function include(file){
  return HtmlService.createHtmlOutputFromFile(file).getContent();
}

function getEvents(){
  return readEvents();
}