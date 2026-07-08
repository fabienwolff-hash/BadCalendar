const ValidationService = {

  validate(events) {

  const issues = [];

  const requiredFields = [
    {
      field: "type",
      label: "Type"
    },
    {
      field: "scope",
      label: "Scope"
    },
    {
      field: "title",
      label: "Title"
    },
    {
      field: "startDate",
      label: "StartDate"
    },
    {
      field: "endDate",
      label: "EndDate"
    },
    {
      field: "categories",
      label: "Categories"
    },
    {
      field: "registrationMode",
      label: "RegistrationMode"
    }
  ];

  requiredFields.forEach(rule => {
    issues.push(
      ...this.validateRequiredField_(events, rule)
    );
  });

  issues.sort((a, b) => {

    if (a.row !== b.row) {
      return a.row - b.row;
    }

    return a.field.localeCompare(b.field);

  });

  return issues;

  },

  validateRequiredField_(events, rule) {

	const issues = [];

	events.forEach((event, index) => {

		const value = event[rule.field];

		const isMissing =
		  value === null ||
		  value === undefined ||
		  (typeof value === "string" && value.trim() === "");

		if (isMissing) {

		  issues.push(
			ValidationIssue.error(
			  index + 2,
			  rule.label,
			  `${rule.label} obligatoire`
			)
		  );
		}
	  });

	  return issues;
  }
};