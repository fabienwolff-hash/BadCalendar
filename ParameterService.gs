const ParameterService = {

  cache_: undefined,
  departmentsCache_: undefined,

  read() {

    if (this.cache_) {
      return this.cache_;
    }

    const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
	const sheet = ss.getSheetByName(CONFIG.PARAMETERS_SHEET_NAME);

    if (!sheet) {
      throw new Error("Sheet 'Parameters' not found.");
    }

    const values = sheet.getDataRange().getValues();

    const rows = values.slice(1);

    const parameters = {};

    rows.forEach(row => {

      const list = String(row[0] || "").trim();
      const value = String(row[1] || "").trim();

      if (!list || !value) {
        return;
      }

      if (!parameters[list]) {
        parameters[list] = [];
      }

      parameters[list].push(value);

    });

    this.cache_ = parameters;

    return parameters;
  },
  
  readDepartments() {

	  if (this.departmentsCache_) {
		return this.departmentsCache_;
	  }

	  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
	  const sheet = ss.getSheetByName(CONFIG.DEPARTMENTS_SHEET_NAME);

	  const values = sheet.getDataRange().getValues();

	  const departments = {};

	  values.slice(1).forEach(row => {

		const code = String(row[0]).trim();
		const label = String(row[1]).trim();

		departments[code] = label;

	  });

	  this.departmentsCache_ = departments;

	  return departments;
  },

  getList(listName) {

    const parameters = this.read();

    return parameters[listName] || [];

  },
  
	getDepartmentLabel(departmentCode) {

		const departments = this.readDepartments();

		return departments[departmentCode] || null;

	},

  hasValue(listName, value) {

    return this
      .getList(listName)
      .includes(value);

  },

  clearCache() {

    this.cache_ = null;
	this.departmentsCache_ = null;
  }
};