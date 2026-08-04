const TournamentService = {

  read() {

    const rows =
      this.readRows_();

    const tournaments =
      this.buildTournaments_(rows)
        .map(tournament => this.enrich_(tournament));

    this.sort_(tournaments);

	return tournaments.map(tournament =>
	  this.toDto_(
		this.serialize_(tournament)
	  )
	);
  },

  readRows_() {

    const ss =
      SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);

    const sheet =
      ss.getSheetByName(CONFIG.SHEET_NAME);

    const values =
      sheet.getDataRange().getValues();

    const headers =
      values[0];

    const rows =
      values.slice(1);

    return rows
      .filter(row => !this.isEmptyRow_(row))
      .map(row => this.normalizeRow_(headers, row));
  },

  normalizeRow_(headers, row) {

    const raw = {};

    headers.forEach((header, index) => {
      raw[header] = row[index];
    });

    return {
      tournamentId: raw.TournamentId || "",

      type: raw.Type || "",
      scope: raw.Scope || "",
      title: raw.Title || "",

      startDate: this.parseDate_(raw.StartDate),
      endDate: this.parseDate_(raw.EndDate),

      region: raw.Region || "",
      department: raw.Department || "",
      city: raw.City || "",
      gymnasium: raw.Gymnasium || "",

      disciplines: raw.Disciplines || "",
      categories: raw.Categories || "",

      registrationMode: raw.RegistrationMode || "",
      registrationOpenDate:
        this.parseDate_(raw.RegistrationOpenDate),
      registrationCloseDate:
        this.parseDate_(raw.RegistrationCloseDate),

      creationDate:
        this.parseDate_(raw.CreationDate),

      eventUrl: raw.EventUrl || ""
    };
  },

  buildTournaments_(rows) {

    const groups =
      this.groupByTournamentId_(rows);

    return Object.keys(groups).map(tournamentId =>
      this.buildTournament_(
        tournamentId,
        groups[tournamentId]
      )
    );
  },

  groupByTournamentId_(rows) {

    const groups = {};

    rows.forEach(row => {

      if (!groups[row.tournamentId]) {
        groups[row.tournamentId] = [];
      }

      groups[row.tournamentId].push(row);
    });

    return groups;
  },

  buildTournament_(tournamentId, rows) {

    const firstRow =
      rows[0];

    const programs =
      this.buildPrograms_(rows);

    return {
      tournamentId,

      title: firstRow.title,
      type: firstRow.type,
      scope: firstRow.scope,

      registration:
        this.buildRegistration_(firstRow),

      eventUrl:
        firstRow.eventUrl,

      creationDate:
        firstRow.creationDate,

      programs
    };
  },

  buildRegistration_(row) {

    return {
      mode: row.registrationMode,
      openDate: row.registrationOpenDate,
      closeDate: row.registrationCloseDate
    };
  },

  buildPrograms_(rows) {

    const programs =
      rows.map(row => this.buildProgram_(row));

    this.sortPrograms_(programs);

    return programs;
  },

  buildProgram_(row) {

    return {
      startDate:
        row.startDate,

      endDate:
        row.endDate,

      disciplines:
        this.splitList_(row.disciplines),

      categories:
        this.splitList_(row.categories),

      sites:
        this.buildSites_(row)
    };
  },

	buildSites_(row) {

	  const site =
		this.buildSite_(row);

	  if (
		!site.region &&
		!site.department &&
		!site.city &&
		!site.gymnasium
	  ) {
		return [];
	  }

	  return [site];
	},

	buildSite_(row) {

	  const city =
		row.city || "";

	  return {
		region:
		  row.region || "",

		department:
		  row.department || "",

		city,

		gymnasium:
		  row.gymnasium || "",

		googleMapsUrl:
		  city
			? LocationService.buildGoogleMapsUrl(city)
			: ""
	  };
	},

  enrich_(tournament) {

    const startDate =
      this.getTournamentStartDate_(tournament);

    const endDate =
      this.getTournamentEndDate_(tournament);

    const registrationStatus =
      this.computeRegistrationStatus_(
        tournament.registration.openDate,
        tournament.registration.closeDate
      );

    const tournamentStatus =
      this.computeTournamentStatus_(
        startDate,
        endDate
      );
	  
	const categoriesArray = this.buildCategoriesArray_(tournament);

	const disciplinesArray = this.buildDisciplinesArray_(tournament);

	const siteCount = this.getUniqueSites_(tournament).length;  

    const enrichedTournament = {
      ...tournament,

      startDate,
      endDate,
	  categoriesArray,
	  disciplinesArray,
	  siteCount,

      tournamentStatus,
      registrationStatus,

      displayDate:
        this.buildDisplayDate_({
          startDate,
          endDate
        }),

      displayLocation:
        this.buildDisplayLocation_(tournament),

      month:
        startDate
          ? startDate.toLocaleString(
              CONFIG.LOCALE,
              { month: "long" }
            )
          : "",

      monthNumber:
        startDate
          ? startDate.getMonth() + 1
          : null,

      year:
        startDate
          ? startDate.getFullYear()
          : null
    };

    return enrichedTournament;
  },

	buildCategoriesArray_(tournament) {

	  const categories =
		new Set();

	  tournament.programs.forEach(program => {

		program.categories.forEach(category => {
		  categories.add(category);
		});

	  });

	  return [...categories].sort();
	},
	
	buildDisciplinesArray_(tournament) {

	  const disciplines =
		new Set();

	  tournament.programs.forEach(program => {

		program.disciplines.forEach(discipline => {
		  disciplines.add(discipline);
		});

	  });

	  return [...disciplines].sort();
	},

  getTournamentStartDate_(tournament) {

    const dates =
      tournament.programs
        .map(program => program.startDate)
        .filter(Boolean);

    if (dates.length === 0) {
      return null;
    }

    return new Date(
      Math.min.apply(
        null,
        dates.map(date => date.getTime())
      )
    );
  },

  getTournamentEndDate_(tournament) {

    const dates =
      tournament.programs
        .map(program => program.endDate)
        .filter(Boolean);

    if (dates.length === 0) {
      return null;
    }

    return new Date(
      Math.max.apply(
        null,
        dates.map(date => date.getTime())
      )
    );
  },

  computeRegistrationStatus_(open, close) {

    if (!open || !close) {
      return CONFIG.STATUS.REGISTRATION.UNKNOWN;
    }

    const today =
      new Date();

    today.setHours(0, 0, 0, 0);

    const openDate =
      new Date(open);

    openDate.setHours(0, 0, 0, 0);

    const closeDate =
      new Date(close);

    closeDate.setHours(0, 0, 0, 0);

    if (today < openDate) {
      return CONFIG.STATUS.REGISTRATION.NOT_OPEN;
    }

    if (today > closeDate) {
      return CONFIG.STATUS.REGISTRATION.CLOSED;
    }

    return CONFIG.STATUS.REGISTRATION.OPEN;
  },

  computeTournamentStatus_(startDate, endDate) {

    if (!startDate || !endDate) {
      return CONFIG.STATUS.EVENT.UPCOMING;
    }

    const today =
      new Date();

    today.setHours(0, 0, 0, 0);

    const start =
      new Date(startDate);

    start.setHours(0, 0, 0, 0);

    const end =
      new Date(endDate);

    end.setHours(0, 0, 0, 0);

    if (today < start) {
      return CONFIG.STATUS.EVENT.UPCOMING;
    }

    if (today > end) {
      return CONFIG.STATUS.EVENT.FINISHED;
    }

    return CONFIG.STATUS.EVENT.ONGOING;
  },

 buildDisplayLocation_(tournament) {

  const sites =
    this.getUniqueSites_(tournament);

  if (sites.length === 0) {

    const department =
      this.getSingleDepartment_(tournament);

    if (department) {

      const departments =
        ParameterService.readDepartments();

      return departments[department] || department;
    }

    const region =
      this.getSingleRegion_(tournament);

    if (region) {
      return region;
    }

    return "Lieu à définir";
  }

  if (sites.length === 1) {

    const site =
      sites[0];

    if (site.city && site.department) {
      return `${site.city} (${site.department})`;
    }

    if (site.city) {
      return site.city;
    }

    if (site.department) {

      const departments =
        ParameterService.readDepartments();

      return departments[site.department] || site.department;
    }

    if (site.region) {
      return site.region;
    }

    return "Lieu à définir";
  }

  return `${sites.length} sites de compétition`;
},

getUniqueSites_(tournament) {

  const seen = {};
  const sites = [];

  tournament.programs.forEach(program => {

    program.sites.forEach(site => {

      const key = [
        site.region || "",
        site.department || "",
        site.city || "",
        site.gymnasium || ""
      ].join("|");

      if (!seen[key]) {
        seen[key] = true;
        sites.push(site);
      }

    });

  });

  return sites;
},

  getUniqueCities_(tournament) {

    const cities =
      new Set();

    tournament.programs.forEach(program => {
      program.sites.forEach(site => {
        if (site.city) {
          cities.add(site.city);
        }
      });
    });

    return [...cities];
  },

	getSingleDepartment_(tournament) {

	  const departments =
		new Set();

	  tournament.programs.forEach(program => {
		program.sites.forEach(site => {
		  if (site.department) {
			departments.add(site.department);
		  }
		});
	  });

	  return departments.size === 1
		? [...departments][0]
		: "";
	},

	getSingleRegion_(tournament) {

	  const regions =
		new Set();

	  tournament.programs.forEach(program => {
		program.sites.forEach(site => {
		  if (site.region) {
			regions.add(site.region);
		  }
		});
	  });

	  return regions.size === 1
		? [...regions][0]
		: "";
	},

  buildDisplayDate_(eventLike) {

    const start =
      eventLike.startDate;

    const end =
      eventLike.endDate;

    if (!start) {
      return "";
    }

    if (!end || this.isSameDay_(start, end)) {
      return this.formatSingleDayDate_(start);
    }

    if (
      start.getMonth() === end.getMonth() &&
      start.getFullYear() === end.getFullYear()
    ) {
      return `${start.getDate()} - ${end.getDate()} ${this.formatMonth_(start)}`;
    }

    return `${this.formatDateWithoutWeekday_(start)} - ${
      this.formatDateWithoutWeekday_(end)
    }`;
  },

  sort_(tournaments) {

    tournaments.sort((a, b) => {

      if (!a.startDate && !b.startDate) {
        return 0;
      }

      if (!a.startDate) {
        return 1;
      }

      if (!b.startDate) {
        return -1;
      }

      return a.startDate.getTime() -
        b.startDate.getTime();
    });
  },

  sortPrograms_(programs) {

    programs.sort((a, b) => {

      if (!a.startDate && !b.startDate) {
        return 0;
      }

      if (!a.startDate) {
        return 1;
      }

      if (!b.startDate) {
        return -1;
      }

      return a.startDate.getTime() -
        b.startDate.getTime();
    });
  },

  serialize_(tournament) {

    return {
      ...tournament,

      startDate:
        this.serializeDate_(tournament.startDate),

      endDate:
        this.serializeDate_(tournament.endDate),

      creationDate:
        this.serializeDate_(tournament.creationDate),

      registration: {
        ...tournament.registration,

        openDate:
          this.serializeDate_(
            tournament.registration.openDate
          ),

        closeDate:
          this.serializeDate_(
            tournament.registration.closeDate
          )
      },

      programs:
        tournament.programs.map(program =>
          this.serializeProgram_(program)
        )
    };
  },

  serializeProgram_(program) {

    return {
      ...program,

      startDate:
        this.serializeDate_(program.startDate),

      endDate:
        this.serializeDate_(program.endDate)
    };
  },

  serializeDate_(date) {

    return date
      ? date.toISOString()
      : null;
  },

  splitList_(value) {

    return (value || "")
      .split(";")
      .map(value => value.trim())
      .filter(Boolean);
  },

  isEmptyRow_(row) {

    return !row ||
      row.every(cell =>
        String(cell).trim() === ""
      );
  },

  isSameDay_(a, b) {

    return a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate();
  },

  formatMonth_(date) {

    return date.toLocaleDateString(
      CONFIG.LOCALE,
      {
        month: "short"
      }
    );
  },

  formatDateWithoutWeekday_(date) {

    return date.toLocaleDateString(
      CONFIG.LOCALE,
      {
        day: "numeric",
        month: "short"
      }
    );
  },

  formatSingleDayDate_(date) {

    return date.toLocaleDateString(
      CONFIG.LOCALE,
      {
        weekday: "short",
        day: "numeric",
        month: "short"
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
        const [y, m, d] =
          value.split("-");

        return new Date(
          Number(y),
          Number(m) - 1,
          Number(d)
        );
      }

      if (value.includes("/")) {
        const [d, m, y] =
          value.split("/");

        return new Date(
          Number(y),
          Number(m) - 1,
          Number(d)
        );
      }
    }

    const date =
      new Date(value);

    return isNaN(date)
      ? null
      : date;
  },
  
  toDto_(tournament) {

	  return {
		tournamentId:
		  tournament.tournamentId,

		title:
		  tournament.title,

		type:
		  tournament.type,

		scope:
		  tournament.scope,

		startDate:
		  tournament.startDate,

		endDate:
		  tournament.endDate,

		displayDate:
		  tournament.displayDate,

		displayLocation:
		  tournament.displayLocation,

		month:
		  tournament.month,

		monthNumber:
		  tournament.monthNumber,

		year:
		  tournament.year,

		categoriesArray:
		  tournament.categoriesArray,

		disciplinesArray:
		  tournament.disciplinesArray,

		registrationMode:
		  tournament.registration.mode,

		registrationOpenDate:
		  tournament.registration.openDate,

		registrationCloseDate:
		  tournament.registration.closeDate,

		registrationStatus:
		  tournament.registrationStatus,

		eventStatus:
		  tournament.tournamentStatus,

		eventUrl:
		  tournament.eventUrl,

		creationDate:
		  tournament.creationDate,
		
		const calendarLocation =
		  tournament.siteCount > 1
			? "Voir BadNet"
			: tournament.displayLocation;
`
		googleCalendarUrl:
		  CalendarService.buildGoogleCalendarUrl({
			title: tournament.title,
			startDate: tournament.startDate,
			endDate: tournament.endDate,
			displayLocation: calendarLocation
		  }),
		
		siteCount:
		  tournament.siteCount,

		programs:
		  tournament.programs
	  };
	}
};