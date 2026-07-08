const ValidationIssue = {

  error(row, field, message) {

    return {
      level: ValidationLevel.ERROR,
      row,
      field,
      message
    };

  },

  warning(row, field, message) {

    return {
      level: ValidationLevel.WARNING,
      row,
      field,
      message
    };

  }

};