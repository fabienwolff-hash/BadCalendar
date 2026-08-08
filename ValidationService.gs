/* exported ValidationService */
/* global ParameterService, ValidationIssue */

const ValidationService = {
  validate(events) {
    const issues = [
      ...this.validateRequiredFields_(events),
      ...this.validateDateRules_(events),
      ...this.validateAllowedValuesRules_(events),
      ...this.validatePatternRules_(events),
      ...this.validateBusinessRules_(events),
      ...this.validateTournamentConsistency_(events),
      ...this.validateStartDateOrder_(events),
    ];

    return issues.sort((a, b) => {
      if (a.row !== b.row) {
        return a.row - b.row;
      }

      return a.field.localeCompare(b.field);
    });
  },

  validateRequiredFields_(events) {
    const rules = [
      { field: "tournamentId", label: "TournamentId" },
      { field: "type", label: "Type" },
      { field: "scope", label: "Scope" },
      { field: "title", label: "Title" },
      { field: "startDate", label: "StartDate" },
      { field: "endDate", label: "EndDate" },
      { field: "categories", label: "Categories" },
    ];

    return rules.flatMap((rule) => this.validateRequiredField_(events, rule));
  },

  validateDateRules_(events) {
    const rules = [
      {
        firstField: "startDate",
        secondField: "endDate",
        firstLabel: "StartDate",
        secondLabel: "EndDate",
        level: "ERROR",
        message: "EndDate doit être supérieure ou égale à StartDate",
        isValid: (start, end) => end >= start,
      },
      {
        firstField: "registrationOpenDate",
        secondField: "registrationCloseDate",
        firstLabel: "RegistrationOpenDate",
        secondLabel: "RegistrationCloseDate",
        level: "ERROR",
        message: "RegistrationCloseDate doit être supérieure ou égale à RegistrationOpenDate",
        isValid: (open, close) => close >= open,
      },
      {
        firstField: "registrationOpenDate",
        secondField: "startDate",
        firstLabel: "RegistrationOpenDate",
        secondLabel: "StartDate",
        level: "WARNING",
        message: "Les inscriptions ouvrent après le début de l'événement",
        isValid: (open, start) => open <= start,
      },
      {
        firstField: "registrationCloseDate",
        secondField: "startDate",
        firstLabel: "RegistrationCloseDate",
        secondLabel: "StartDate",
        level: "WARNING",
        message: "Les inscriptions ferment après le début de l'événement",
        isValid: (close, start) => close <= start,
      },
    ];

    return rules.flatMap((rule) => this.validateDateOrder_(events, rule));
  },

  validateAllowedValuesRules_(events) {
    const parameters = ParameterService.read();

    const rules = [
      {
        field: "type",
        label: "Type",
        allowedValues: parameters.Type,
        multiple: false,
      },
      {
        field: "scope",
        label: "Scope",
        allowedValues: parameters.Scope,
        multiple: false,
      },
      {
        field: "categories",
        label: "Categories",
        allowedValues: parameters.Category,
        multiple: true,
      },
      {
        field: "region",
        label: "Region",
        allowedValues: parameters.Region,
        multiple: false,
      },
      {
        field: "department",
        label: "Department",
        allowedValues: parameters.Department,
        multiple: false,
      },
      {
        field: "disciplines",
        label: "Disciplines",
        allowedValues: parameters.Discipline,
        multiple: true,
      },
    ];

    return rules.flatMap((rule) => this.validateAllowedValues_(events, rule));
  },

  validatePatternRules_(events) {
    const rules = [
      {
        field: "eventUrl",
        label: "EventUrl",
        pattern: /^https?:\/\//,
        message: "URL invalide",
      },
    ];

    return rules.flatMap((rule) => this.validatePattern_(events, rule));
  },

  validateBusinessRules_(events) {
    const rules = [
      {
        field: "disciplines",
        label: "Disciplines",
        message: "Disciplines obligatoire pour ce type d'événement",

        isValid: (event) => {
          if (event.type === "Stage") {
            return true;
          }

          return event.disciplines && event.disciplines.trim() !== "";
        },
      },
    ];

    return rules.flatMap((rule) => this.validateBusinessRule_(events, rule));
  },

  validateRequiredField_(events, rule) {
    const issues = [];

    events.forEach((event, index) => {
      const value = event[rule.field];

      const isMissing =
        value === null || value === undefined || (typeof value === "string" && value.trim() === "");

      if (isMissing) {
        issues.push(ValidationIssue.error(index + 2, rule.label, `${rule.label} obligatoire`));
      }
    });

    return issues;
  },

  validateDateOrder_(events, rule) {
    const issues = [];

    events.forEach((event, index) => {
      const first = event[rule.firstField];
      const second = event[rule.secondField];

      if (!first || !second) {
        return;
      }

      if (!rule.isValid(first, second)) {
        issues.push(
          ValidationIssue[rule.level.toLowerCase()](
            index + 2,
            `${rule.firstLabel} / ${rule.secondLabel}`,
            rule.message
          )
        );
      }
    });

    return issues;
  },

  validateAllowedValues_(events, rule) {
    const issues = [];

    events.forEach((event, index) => {
      const value = event[rule.field];

      if (!value) {
        return;
      }

      const values = rule.multiple
        ? value
            .split(";")
            .map((v) => v.trim())
            .filter(Boolean)
        : [value];

      values.forEach((currentValue) => {
        if (!rule.allowedValues.includes(currentValue)) {
          issues.push(
            ValidationIssue.error(
              index + 2,
              rule.label,
              `"${currentValue}" n'est pas une valeur autorisée`
            )
          );
        }
      });
    });

    return issues;
  },

  validatePattern_(events, rule) {
    const issues = [];

    events.forEach((event, index) => {
      const value = event[rule.field];

      if (!value) {
        return;
      }

      if (!rule.pattern.test(value)) {
        issues.push(ValidationIssue.error(index + 2, rule.label, rule.message));
      }
    });

    return issues;
  },

  validateBusinessRule_(events, rule) {
    const issues = [];

    events.forEach((event, index) => {
      if (rule.isValid(event)) {
        return;
      }

      issues.push(ValidationIssue.error(index + 2, rule.label, rule.message));
    });

    return issues;
  },

  validateTournamentConsistency_(events) {
    const issues = [];

    const groups = {};

    events.forEach((event, index) => {
      if (!event.tournamentId) {
        return;
      }

      if (!groups[event.tournamentId]) {
        groups[event.tournamentId] = [];
      }

      groups[event.tournamentId].push({
        row: index + 2,
        event,
      });
    });

    const fields = [
      {
        field: "title",
        label: "Title",
      },
      {
        field: "type",
        label: "Type",
      },
      {
        field: "scope",
        label: "Scope",
      },
      {
        field: "registrationOpenDate",
        label: "RegistrationOpenDate",
      },
      {
        field: "registrationCloseDate",
        label: "RegistrationCloseDate",
      },
      {
        field: "eventUrl",
        label: "EventUrl",
      },
    ];

    Object.entries(groups).forEach(([tournamentId, rows]) => {
      if (rows.length < 2) {
        return;
      }

      const reference = rows[0].event;

      fields.forEach((rule) => {
        rows.slice(1).forEach((current) => {
          const left = reference[rule.field];

          const right = current.event[rule.field];

          const leftValue = left instanceof Date ? left.getTime() : String(left || "");

          const rightValue = right instanceof Date ? right.getTime() : String(right || "");

          if (leftValue !== rightValue) {
            issues.push(
              ValidationIssue.error(
                current.row,
                rule.label,
                `Tournament ${tournamentId} : ${rule.label} incohérent`
              )
            );
          }
        });
      });
    });

    return issues;
  },

  validateStartDateOrder_(events) {
    const issues = [];

    let previousDate = null;

    events.forEach((event, index) => {
      const currentDate = event.startDate;

      if (!currentDate) {
        return;
      }

      if (previousDate && currentDate.getTime() < previousDate.getTime()) {
        issues.push(
          ValidationIssue.warning(
            index + 2,
            "StartDate",
            "Le fichier n'est pas trié par StartDate croissante"
          )
        );
      }

      previousDate = currentDate;
    });

    return issues;
  },
};
