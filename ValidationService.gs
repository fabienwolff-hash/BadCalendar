const ValidationService = {

  validate(events) {

    const issues = [];

    this.validateRequiredField_(
      events,
      issues,
      "startDate",
      "StartDate"
    );

    this.validateRequiredField_(
      events,
      issues,
      "endDate",
      "EndDate"
    );

    this.validateRequiredField_(
      events,
      issues,
      "type",
      "Type"
    );

    this.validateRequiredField_(
      events,
      issues,
      "scope",
      "Scope"
    );

    return issues;

  },

  validateRequiredField_(events, issues, property, field) {

    events.forEach((event, index) => {

      const value = event[property];

      const isMissing =
        value == null ||
        (typeof value === "string" && value.trim() === "");

      if (isMissing) {
        issues.push({
          level: "ERROR",
          row: index + 2,
          field,
          message: "Champ obligatoire"
        });
      }
    });
  }
};