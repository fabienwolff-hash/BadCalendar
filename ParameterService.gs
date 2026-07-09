const ParameterService = {

  cache_: null,

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

  getList(listName) {

    const parameters = this.read();

    return parameters[listName] || [];

  },

  hasValue(listName, value) {

    return this
      .getList(listName)
      .includes(value);

  },

  clearCache() {

    this.cache_ = null;

  }

};