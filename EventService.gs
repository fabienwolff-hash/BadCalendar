const EventService = {

  read() {

	let events = this.readNormalized()
        .map(event => this.enrich_(event));

    this.sort_(events);

	return events.map(event => ({

	  ...event,

	  startDate: event.startDate.toISOString(),
	  endDate: event.endDate.toISOString(),
	  registrationOpenDate:
      event.registrationOpenDate
        ? event.registrationOpenDate.toISOString()
        : null,
	  registrationCloseDate:
      event.registrationCloseDate
        ? event.registrationCloseDate.toISOString()
        : null,
	}));

  },
  
  readNormalized() {

    const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    const sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
    const values = sheet.getDataRange().getValues();

    const headers = values[0];
    const rows = values.slice(1);

    return rows
        .filter(row => !this.isEmptyRow_(row))
        .map(row => this.normalize_(headers, row));
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
	  region: raw.Region || "",
	  department: raw.Department || "",
	  city: raw.City || "",
	  categories: raw.Categories || "",
	  disciplines: raw.Disciplines || "",
	  registrationMode: raw.RegistrationMode || "",
	  registrationOpenDate: this.parseDate_(raw.RegistrationOpenDate),
	  registrationCloseDate: this.parseDate_(raw.RegistrationCloseDate),
	  eventUrl: raw.EventUrl || ""	  
	};
  },

  enrich_(event) {
	const startDate = event.startDate;
	const endDate = event.endDate;
	const today = new Date();

	// on ignore l'heure
	today.setHours(0,0,0,0);

	const start = new Date(startDate);
	start.setHours(0,0,0,0);

	const end = new Date(endDate);
	end.setHours(0,0,0,0);

	let eventStatus;

	if (today < start) {
	  eventStatus = CONFIG.STATUS.EVENT.UPCOMING;
	} else if (today > end) {
	  eventStatus = CONFIG.STATUS.EVENT.FINISHED;
	} else {
	  eventStatus = CONFIG.STATUS.EVENT.ONGOING;
	}
	
	const displayLocation = this.buildDisplayLocation_(event);
	const displayDate = this.buildDisplayDate_(event);
	
	let registrationStatus;

	const open = event.registrationOpenDate;
	const close = event.registrationCloseDate;

	if (!open || !close) {
		registrationStatus = CONFIG.STATUS.REGISTRATION.UNKNOWN;
	} else {
		const openDate = new Date(open);
		openDate.setHours(0,0,0,0);

		const closeDate = new Date(close);
		closeDate.setHours(0,0,0,0);

		if (today < openDate) {
			registrationStatus =
				CONFIG.STATUS.REGISTRATION.NOT_OPEN;
		} else if (today > closeDate) {
			registrationStatus =
				CONFIG.STATUS.REGISTRATION.CLOSED;
		} else {
			registrationStatus =
				CONFIG.STATUS.REGISTRATION.OPEN;
		}
	}

	return {

	  ...event,

	  eventStatus,
	  registrationStatus,
	  displayLocation,
	  displayDate,
	  googleMapsUrl: LocationService.buildGoogleMapsUrl(event.city),
	  month: startDate.toLocaleString(
		CONFIG.LOCALE,
		{ month: "long" }
	  ),

	  monthNumber: startDate.getMonth() + 1,

	  year: startDate.getFullYear(),
	  
	  disciplinesArray: (event.disciplines || "")
	    .split(";")
	    .map(d => d.trim())
	    .filter(Boolean),

	  categoriesArray: (event.categories || "")
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
  
  isEmptyRow_(row) {

    return !row ||
        row.every(cell =>
            String(cell).trim() === ""
        );

  },
  
	buildDisplayLocation_(event) {

		if (event.city && event.city.trim()) {

			if (event.department && event.department.trim()) {
				return `${event.city} (${event.department})`;
			}
			return event.city;
		}

		if (event.department && event.department.trim()) {
	
			const departments = ParameterService.readDepartments();
			
			return departments[event.department]|| event.department;

		}

		if (event.region && event.region.trim()) {
			return event.region;
		}

		return "Lieu à définir";
	},
	
	buildDisplayDate_(event){
		const start = event.startDate;
		const end = event.endDate;

		if (!end || this.isSameDay_(start, end)) {
			return this.formatSingleDayDate_(start);
		}

		if (
			start.getMonth() === end.getMonth()
			&&
			start.getFullYear() === end.getFullYear()
		) {
			return `${start.getDate()} - ${end.getDate()} ${
				this.formatMonth_(start)
			}`;
		}

		return `${this.formatDateWithoutWeekday_(start)} - ${
			this.formatDateWithoutWeekday_(end)
		}`;
	},

	isSameDay_(a,b){

		return a.getFullYear() === b.getFullYear()
			&& a.getMonth() === b.getMonth()
			&& a.getDate() === b.getDate();

	},
	
	formatMonth_(date){

		return date.toLocaleDateString(
			CONFIG.LOCALE,
			{
				month:"short"
			}
		);
	},

	formatDateWithoutWeekday_(date){

		return date.toLocaleDateString(
			CONFIG.LOCALE,
			{
				day:"numeric",
				month:"short"
			}
		);
	},
	
	formatSingleDayDate_(date){

		return date.toLocaleDateString(
			CONFIG.LOCALE,
			{
				weekday:"short",
				day:"numeric",
				month:"short"
			}
		);
	},
  
	parseDate_(value) {

		if (!value) {
			return null;
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
		? null
		: date;
	}
};