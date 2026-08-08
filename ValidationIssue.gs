/* exported ValidationIssue */

const ValidationIssue = {
  error(row, field, message) {
    return {
      level: "ERROR",
      row,
      field,
      message,
    };
  },

  warning(row, field, message) {
    return {
      level: "WARNING",
      row,
      field,
      message,
    };
  },
};
