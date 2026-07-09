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
	  
	  const dateRules = [
	  {
		firstField: "startDate",
		secondField: "endDate",

		firstLabel: "StartDate",
		secondLabel: "EndDate",

		level: "ERROR",

		message: "EndDate doit être supérieure ou égale à StartDate",

		isValid: (start, end) => end >= start
	  },

	  {
		firstField: "registrationOpenDate",
		secondField: "registrationCloseDate",

		firstLabel: "RegistrationOpenDate",
		secondLabel: "RegistrationCloseDate",

		level: "ERROR",

		message:
		  "RegistrationCloseDate doit être supérieure ou égale à RegistrationOpenDate",

		isValid: (open, close) => close >= open
	  },

	  {
		firstField: "registrationOpenDate",
		secondField: "startDate",

		firstLabel: "RegistrationOpenDate",
		secondLabel: "StartDate",

		level: "WARNING",

		message:
		  "Les inscriptions ouvrent après le début de l'événement",

		isValid: (open, start) => open <= start
	  },

	  {
		firstField: "registrationCloseDate",
		secondField: "startDate",

		firstLabel: "RegistrationCloseDate",
		secondLabel: "StartDate",

		level: "WARNING",

		message:
		  "Les inscriptions ferment après le début de l'événement",

		isValid: (close, start) => close <= start
	  }

	];
	
	  dateRules.forEach(rule => {
    	  issues.push(
			...this.validateDateOrder_(events, rule)
		  );

		});
		
	const allowedValueRules = [
		{
			field: "type",
			label: "Type",
			allowedValues: CONFIG.ALLOWED_VALUES.TYPES,
			multiple: false
		 },
    	{
			field: "scope",
			label: "Scope",
			allowedValues: CONFIG.ALLOWED_VALUES.SCOPES,
			multiple: false
		},
    	{
			field: "categories",
			label: "Categories",
			allowedValues: CONFIG.ALLOWED_VALUES.CATEGORIES,
			multiple: true
		},
		{
			field: "registrationMode",
			label: "RegistrationMode",
			allowedValues: CONFIG.ALLOWED_VALUES.REGISTRATION_MODES,
			multiple: false
		}
	];
		
	allowedValueRules.forEach(rule => {

		  issues.push(
			...this.validateAllowedValues_(events, rule)
		  );
	});
	
	const patternRules = [
	  {
		field: "eventUrl",
		label: "EventUrl",
		pattern: /^https?:\/\//,
		message: "URL invalide"
	  }
	];

	patternRules.forEach(rule => {

	  issues.push(
		...this.validatePattern_(events, rule)
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
		  ? value.split(";").map(v => v.trim()).filter(Boolean)
		  : [value];

		values.forEach(currentValue => {

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

		  issues.push(
			ValidationIssue.error(
			  index + 2,
			  rule.label,
			  rule.message
			)
		  );
		}
	  });

	  return issues;
	}
};