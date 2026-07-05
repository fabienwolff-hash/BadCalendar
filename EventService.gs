const EventService = {

  read() {

    const ss = SpreadsheetApp.openById(
      PropertiesService.getScriptProperties().getProperty("SPREADSHEET_ID")
    );

    const sheet = ss.getSheetByName("Master");

    const values = sheet.getDataRange().getValues();

    const headers = values[0];
    const rows = values.slice(1);

    let events = rows
      .filter(row => row && row[0] !== "")
      .map(row => this.normalize_(headers, row))
      .filter(event => event.active)
      .map(event => this.enrich_(event));

    this.sort_(events);

    return events.map(event => ({
      ...event,
      startDate: event.startDate.toISOString(),
      endDate: event.endDate.toISOString()
    }));

  },

  normalize_(headers, row) {

    const raw = {};

    headers.forEach((header, index) => {

      raw[header] = row[index];

    });

    return {

      type: raw.Type || "",

      title: raw.Titre || "",

      startDate: this.parseDate_(raw.DateDebut),

      endDate: this.parseDate_(raw.DateFin),

      location: raw.Lieu || "",

      category: raw.CategorieAffichee || "",

      registrationType: raw.TypeInscription || "",

      registrationUrl: raw.LienInscription || "",

      active: raw.Actif === "✅"

    };

  },

  enrich_(event) {

    return {

      ...event

    };

  },

  sort_(events) {

    events.sort((a, b) =>

      a.startDate.getTime() - b.startDate.getTime()

    );

  },

  parseDate_(value) {

    if (!value) {

      return new Date(9999, 0, 1);

    }

    if (value instanceof Date) {

      return value;

    }

    if (typeof value === "string") {

      if (value.includes("-")) {

        const [y, m, d] = value.split("-");

        return new Date(Number(y), Number(m) - 1, Number(d));

      }

      if (value.includes("/")) {

        const [d, m, y] = value.split("/");

        return new Date(Number(y), Number(m) - 1, Number(d));

      }

    }

    const date = new Date(value);

    return isNaN(date)
      ? new Date(9999, 0, 1)
      : date;

  }

};