/* exported LocationService */
/* global CONFIG */

const LocationService = {
  cache_: null,

  read() {
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

    const locations = {
      byCity: {},
      byCityAndGymnasium: {},
    };

    rows.forEach((row) => {
      const city = String(row[0] || "").trim();
      const gymnasium = String(row[1] || "").trim();
      const googleMapsQuery = String(row[2] || "").trim();

      if (!city) {
        return;
      }

      locations.byCity[city] = googleMapsQuery;

      if (gymnasium) {
        locations.byCityAndGymnasium[`${city}|${gymnasium}`] = googleMapsQuery;
      }
    });

    this.cache_ = locations;

    return locations;
  },

  buildGoogleMapsUrl(department, city, gymnasium) {
    const locations = this.read();

    let query = null;

    if (gymnasium && gymnasium.trim()) {
      query = locations.byCityAndGymnasium[`${city}|${gymnasium}`];
    }

    if (!query && city) {
      query = locations.byCity[city];
    }

    // Fallback dynamique
    if (!query && city) {
      query = department ? `${city}, ${department}` : city;
    }

    if (!query) {
      return null;
    }

    const encodedQuery = encodeURIComponent(query);

    return `https://www.google.com/maps/search/?api=1&query=${encodedQuery}`;
  },

};
