const TournamentService = {

    read() {

	  const tournaments = this
		.readNormalized()
		.map(tournament => this.enrich_(tournament));

	  this.sort_(tournaments);

	  return tournaments.map(tournament => this.serialize_(tournament));

	},
	
	readNormalized() {

	  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
	  const sheet = ss.getSheetByName(CONFIG.SHEET_NAME);

	  const values = sheet.getDataRange().getValues();

	  const headers = values[0];
	  const rows = values.slice(1);

	  const normalizedRows = rows
		.filter(row => !this.isEmptyRow_(row))
		.map(row => this.normalizeRow_(headers, row));

	  const tournaments = this.groupByTournamentId_(normalizedRows);

	  return tournaments.map(group => this.buildTournament_(group));

	},
	
	/**
	 * Transforme une ligne du Master en objet normalisé.
	 *
	 * Aucune logique métier n'est appliquée ici.
	 * Les agrégations (Program, Site, disciplines, etc.)
	 * sont réalisées ultérieurement par TournamentService.
	 */
	normalizeRow_(headers, row) {

	  const raw = {};

	  headers.forEach((header, index) => {
		raw[header] = row[index];
	  });

	  return {

		// Clé métier
		tournamentId: raw.TournamentId || "",

		// Informations communes au Tournament
		type: raw.Type || "",
		scope: raw.Scope || "",
		title: raw.Title || "",

		// Programme
		startDate: this.parseDate_(raw.StartDate),
		endDate: this.parseDate_(raw.EndDate),

		disciplines: raw.Disciplines || "",
		categories: raw.Categories || "",

		// Site
		region: raw.Region || "",
		department: raw.Department || "",
		city: raw.City || "",

		// Inscriptions
		registrationMode: raw.RegistrationMode || "",
		registrationOpenDate: this.parseDate_(raw.RegistrationOpenDate),
		registrationCloseDate: this.parseDate_(raw.RegistrationCloseDate),

		// Divers
		eventUrl: raw.EventUrl || ""

	  };

	},
	
	/**
	 * Regroupe les lignes normalisées par TournamentId.
	 *
	 * Chaque groupe correspond à un futur Tournament.
	 */
	groupByTournamentId_(rows) {

	  const groups = {};

	  rows.forEach(row => {

		if (!groups[row.tournamentId]) {
		  groups[row.tournamentId] = {
			tournamentId: row.tournamentId,
			rows: []
		  };
		}

		groups[row.tournamentId].rows.push(row);

	  });

	  return Object.values(groups);
	},
	
	
	buildTournament_(group) {

	  const firstRow = group.rows[0];

	  return {

		// Identité
		tournamentId: firstRow.tournamentId,

		// Informations générales
		title: firstRow.title,
		type: firstRow.type,
		scope: firstRow.scope,

		// Inscriptions
		registration: {
		  mode: firstRow.registrationMode,
		  openDate: firstRow.registrationOpenDate,
		  closeDate: firstRow.registrationCloseDate
		},

		// Lien
		eventUrl: firstRow.eventUrl,

		// Modèle métier
		programs: this.buildPrograms_(group.rows)

	  };
	},
	
	buildPrograms_(rows) {

	  const groups = {};

	  rows.forEach(row => {

		const signature = this.buildProgramSignature_(row);

		if (!groups[signature]) {
		  groups[signature] = [];
		}

		groups[signature].push(row);

	  });

	  const programs = Object
		.values(groups)
		.map(group => this.buildProgram_(group));

	  programs.sort((a, b) =>
		a.startDate.getTime() - b.startDate.getTime()
	  );

	  return programs;
	},
	
	
	buildProgramSignature_(row) {

	  return [
		row.startDate ? row.startDate.getTime() : "",
		row.endDate ? row.endDate.getTime() : "",
		row.city,
		row.gymnasium
	  ].join("|");
	},
	
	buildProgram_(rows) {

	  const firstRow = rows[0];

	  return {

		name: this.buildProgramName_(firstRow),

		startDate: firstRow.startDate,
		endDate: firstRow.endDate,

		disciplines: this.buildDisciplines_(rows),

		categories: this.buildCategories_(rows),

		sites: this.buildSites_(rows)
	  };
	},
	
	
	buildProgramName_(row) {

	  const start = row.startDate;
	  const end = row.endDate;

	  if (!start || !end || this.isSameDay_(start, end)) {
		return this.formatWeekday_(start);
	  }

	  return `${this.formatWeekday_(start)} - ${this.formatWeekday_(end)}`;
	},
};

