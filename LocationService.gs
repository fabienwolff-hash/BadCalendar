const LocationService = {

  cache_: null,

  read() {

    Logger.log("Lecture du Spreadsheet Locations");

    if (this.cache_) {
      return this.cache_;
    }

    const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    const sheet = ss.getSheetByName(CONFIG.LOCATIONS_SHEET_NAME);

    if (!sheet) {
      throw new Error("Sheet 'Locations' not found.");
    }

    const values = sheet.getDataRange().getValues();
    const rows = values.slice(1);

    const locations = {};

    rows.forEach(row => {

      const city = String(row[0] || "").trim();
      const googleMapsQuery = String(row[1] || "").trim();

      if (!city) {
        return;
      }

      locations[city] = googleMapsQuery;
	  
    });

    this.cache_ = locations;

    return locations;
  },

  buildGoogleMapsUrl(city) {

	const locations = this.read();
	const query = city && locations[city.trim()];

	if (!city || !query) {
		return null;
	}

	return `https://www.google.com/maps/search/?api=1&query=${query}`;
  },

  clearCache() {
    this.cache_ = null;
  }

};