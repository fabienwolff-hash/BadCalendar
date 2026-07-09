const CONFIG = {

  APP_NAME: "BadCalendar",

  VERSION: "0.10.0",

  SPREADSHEET_ID:
    PropertiesService.getScriptProperties().getProperty("SPREADSHEET_ID"),

  SHEET_NAME: "Master",

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
  },
  
  ALLOWED_VALUES: {

	  TYPES: [
	    "CDJ",
		"TDJ",
		"TRJ",
		"TIJ",
		"CEJ",
		"BAC",
		"BNP",
		"Interclub",
		"Stage",
		"Promobad",
		"Championnat"
	  ],

	  SCOPES: [
		"Départementale",
		"Régionale",
		"Inter-Régionale",
		"Nationale"
	  ],

	  CATEGORIES: [
		"Minibad",
		"Poussin",
		"Benjamin",
		"Minime",
		"Cadet",
		"Junior"
	  ],
	  
	  ALLOWED_VALUES.REGISTRATION_MODES: [
	    "Inscription libre",
		"Sur sélection de la ligue de Bretagne",
		"Sur Sélection du Comité Départemental"
	  ]
  }
};