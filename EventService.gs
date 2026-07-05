const EventService = {

  read() {

    const ss = SpreadsheetApp.openById(
      PropertiesService.getScriptProperties().getProperty("SPREADSHEET_ID")
    );

	const sheet = ss.getSheetByName(CONFIG.SHEET_NAME);

	const C = CONFIG.COLUMNS;

    const values = sheet.getDataRange().getValues();

    const headers = values[0];
    const rows = values.slice(1);

    let events = rows
      .filter(row => row && row[0] !== "")
      .map(row => this.normalize_(headers, row))
      .map(event => this.enrich_(event));

    this.sort_(events);

	return events.map(event => ({

	  ...event,

	  startDate: event.startDate.toISOString(),
	  endDate: event.endDate.toISOString(),
	  registrationOpenDate:	event.registrationOpenDate.toISOString(),
	  registrationCloseDate: event.registrationCloseDate.toISOString()
	}));

  },

  normalize_(headers, row) {

    const raw = {};

    headers.forEach((header, index) => {

      raw[header] = row[index];

    });

   return {
	  type: raw.Type || "",
	  scope: raw.Scope || "",
	  title: raw.Title || "",
	  startDate: this.parseDate_(raw.StartDate),
	  endDate: this.parseDate_(raw.EndDate),
	  location: raw.Location || "",
	  categories: raw.Categories || "",
	  registrationMode: raw.RegistrationMode || "",
	  registrationOpenDate: this.parseDate_(raw.RegistrationOpenDate),
	  registrationCloseDate: this.parseDate_(raw.RegistrationCloseDate),
	  registrationUrl: raw.RegistrationUrl || ""
	  	  
	};

  },

  enrich_(event) {

  const startDate = event.startDate;

	return {

	  ...event,

	  month: startDate.toLocaleString(
		"fr-FR",
		{ month: "long" }
	  ),

	  monthNumber: startDate.getMonth() + 1,

	  year: startDate.getFullYear(),

	  categoriesArray: event.categories
		.split(";")
		.map(c => c.trim())
		.filter(Boolean)

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