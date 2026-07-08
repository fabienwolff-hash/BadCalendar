const ValidationService = {

  validate(events) {

    const issues = [];

    this.validateStartDate_(events, issues);
    this.validateEndDate_(events, issues);
    this.validateDateOrder_(events, issues);
    this.validateType_(events, issues);
    this.validateScope_(events, issues);

    return issues;

  },

  validateStartDate_(events, issues) {

    events.forEach((event, index) => {

      if (!event.startDate) {

        issues.push({
          level: "ERROR",
          row: index + 2,
          field: "StartDate",
          message: "Date obligatoire"
        });

      }

    });

  },

  validateEndDate_(events, issues) {

    events.forEach((event, index) => {

      if (!event.endDate) {

        issues.push({
          level: "ERROR",
          row: index + 2,
          field: "EndDate",
          message: "Date obligatoire"
        });

      }

    });

  },

  validateDateOrder_(events, issues) {

    events.forEach((event, index) => {

      if (
        event.startDate &&
        event.endDate &&
        event.endDate < event.startDate
      ) {

        issues.push({
          level: "ERROR",
          row: index + 2,
          field: "EndDate",
          message: "La date de fin doit être postérieure ou égale à la date de début"
        });

      }

    });

  },

  validateType_(events, issues) {

    events.forEach((event, index) => {

      if (!event.type) {

        issues.push({
          level: "ERROR",
          row: index + 2,
          field: "Type",
          message: "Type obligatoire"
        });

      }

    });

  },

  validateScope_(events, issues) {

    events.forEach((event, index) => {

      if (!event.scope) {

        issues.push({
          level: "ERROR",
          row: index + 2,
          field: "Scope",
          message: "Portée obligatoire"
        });

      }

    });

  }

};