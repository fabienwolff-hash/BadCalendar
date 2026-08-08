/* exported CONFIG */

const CONFIG = {

  APP_NAME: "BadPlanner",

  APP_VERSION: "0.16.0",

  SPREADSHEET_ID:
    PropertiesService.getScriptProperties().getProperty("SPREADSHEET_ID"),

USAGE_METRICS_SPREADSHEET_ID:
	PropertiesService.getScriptProperties().getProperty("USAGE_METRICS_SPREADSHEET_ID"),

  SHEET_NAME: "Master",
  PARAMETERS_SHEET_NAME: "Parameters",
  LOCATIONS_SHEET_NAME: "Locations",
  DEPARTMENTS_SHEET_NAME: "Departments",
  USAGE_METRICS_SHEET_NAME: "Logs",
    
  LOCALE: "fr-FR",

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