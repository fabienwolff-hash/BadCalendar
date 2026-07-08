const ValidationService = {

  validate(events) {

    const issues = [];

    this.validateRequiredField_(events, issues, {
      property: "startDate",
      field: "StartDate",
      level: "ERROR",
      message: "Champ obligatoire"
    });

    this.validateRequiredField_(events, issues, {
      property: "endDate",
      field: "EndDate",
      level: "ERROR",
      message: "Champ obligatoire"
    });

    this.validateRequiredField_(events, issues, {
      property: "type",
      field: "Type",
      level: "ERROR",
      message: "Champ obligatoire"
    });

    this.validateRequiredField_(events, issues, {
      property: "scope",
      field: "Scope",
      level: "ERROR",
      message: "Champ obligatoire"
    });

    this.validateRequiredField_(events, issues, {
      property: "location",
      field: "Location",
      level: "WARNING",
      message: "Champ recommandé"
    });

    return issues;

  },

  validateRequiredField_(events, issues, rule) {

    events.forEach((event, index) => {

      const value = event[rule.property];

      const isMissing =
        value == null ||
        (typeof value === "string" && value.trim() === "");

      if (isMissing) {

        issues.push({
          level: rule.level,
          row: index + 2,
          field: rule.field,
          message: rule.message
        });

      }

    });

  }

};