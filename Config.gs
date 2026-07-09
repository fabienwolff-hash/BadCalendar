const CONFIG = {

  APP_NAME: "BadCalendar",

  VERSION: "0.10.0",

  SPREADSHEET_ID:
    PropertiesService.getScriptProperties().getProperty("SPREADSHEET_ID"),

  SHEET_NAME: "Master",
  PARAMETERS_SHEET_NAME: "Parameters",
  LOCATIONS_SHEET_NAME: "Locations",

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