/* exported CalendarService */

/**
 * CalendarService
 *
 * Responsable de la construction des URLs Google Calendar.
 */
const CalendarService = {
  /**
   * Construit une URL Google Calendar préremplie.
   *
   * @param {Object} event
   * @returns {string}
   */
  buildGoogleCalendarUrl(event) {
    if (!event || !event.title || !event.startDate || !event.endDate) {
      return "";
    }

    const params = {
      action: "TEMPLATE",
      text: event.title,
      dates: this.buildDates_(event.startDate, event.endDate),
    };

    if (event.displayLocation) {
      params.location = event.displayLocation;
    }

    if (event.eventUrl) {
      params.details = event.eventUrl;
    }

    const query = Object.keys(params)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join("&");

    return `https://calendar.google.com/calendar/render?${query}`;
  },

  /**
   * Construit la plage de dates Google Calendar.
   *
   * Google Calendar utilise une date de fin exclusive
   * pour les événements "Toute la journée".
   *
   * Exemple :
   * 10/10 → 12/10
   * devient
   * 20261010/20261013
   */
  buildDates_(startDate, endDate) {
    const start = new Date(startDate);

    const endExclusive = new Date(endDate);
    endExclusive.setDate(endExclusive.getDate() + 1);

    return this.formatGoogleDate_(start) + "/" + this.formatGoogleDate_(endExclusive);
  },

  /**
   * Convertit une date en format YYYYMMDD.
   */
  formatGoogleDate_(date) {
    const year = date.getFullYear();

    const month = String(date.getMonth() + 1).padStart(2, "0");

    const day = String(date.getDate()).padStart(2, "0");

    return `${year}${month}${day}`;
  },
};
