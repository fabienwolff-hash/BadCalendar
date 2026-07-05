const CONFIG = {

  APP_NAME: "BadCalendar",

  VERSION: "0.6.0",

  SPREADSHEET_ID:
    PropertiesService.getScriptProperties().getProperty("SPREADSHEET_ID"),

  SHEET_NAME: "Master",

  LOCALE: "fr-FR",

  DATE_OPTIONS: {
    day: "numeric",
    month: "long",
    year: "numeric"
  },
  
  STATUS: {

  EVENT: {
    UPCOMING: "UPCOMING",
    ONGOING: "ONGOING",
    FINISHED: "FINISHED"
  },

  REGISTRATION: {
    UNKNOWN: "UNKNOWN",
    NOT_OPEN: "NOT_OPEN",
    OPEN: "OPEN",
    CLOSED: "CLOSED"
  }
}

};