const ValidationService = {

  validate(events) {

    const issues = [];

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

    return issues;

  }

};