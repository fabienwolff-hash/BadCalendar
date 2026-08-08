/* exported onEdit */
/* global CONFIG */

const TYPE_SCOPE_MAPPING = {
  Promobad: "Départementale",
  CDJ: "Départementale",
  TDJ: "Départementale",
  TRJ: "Régionale",
  TIJ: "Inter-Régionale",
  BAC: "Nationale",
  BNP: "Nationale",
  CEJ: "Nationale",
};

const TYPE_REGION_MAPPING = {
  Promobad: "Bretagne",
  TDJ: "Bretagne",
  CDJ: "Bretagne",
  TRJ: "Bretagne",
  Stage: "Bretagne",
  Interclub: "Bretagne",
};

const TYPE_DEPARTMENT_MAPPING = {
  Promobad: "35",
  TDJ: "35",
  CDJ: "35",
};

function onEdit(e) {
  const sheet = e.range.getSheet();

  if (sheet.getName() !== CONFIG.SHEET_NAME) {
    return;
  }

  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

  handleCreationDate_(e, sheet, headers);

  handleScopeFromType_(e, sheet, headers);

  handleRegionFromType_(e, sheet, headers);

  handleDepartmentFromType_(e, sheet, headers);
}

function handleCreationDate_(e, sheet, headers) {
  const tournamentIdColumn = headers.indexOf("TournamentId") + 1;

  const creationDateColumn = headers.indexOf("CreationDate") + 1;

  if (e.range.getColumn() !== tournamentIdColumn) {
    return;
  }

  const row = e.range.getRow();

  if (row === 1) {
    return;
  }

  const tournamentId = e.value;

  if (!tournamentId) {
    return;
  }

  const creationDateCell = sheet.getRange(row, creationDateColumn);

  if (!creationDateCell.getValue()) {
    creationDateCell.setValue(
      new Date(Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd"))
    );
  }
}

function handleScopeFromType_(e, sheet, headers) {
  const typeColumn = headers.indexOf("Type") + 1;

  const scopeColumn = headers.indexOf("Scope") + 1;

  if (typeColumn === 0 || scopeColumn === 0) {
    return;
  }

  if (e.range.getColumn() !== typeColumn) {
    return;
  }

  const row = e.range.getRow();

  if (row === 1) {
    return;
  }

  const type = e.value;

  if (!type) {
    return;
  }

  const scope = TYPE_SCOPE_MAPPING[type];

  if (!scope) {
    return;
  }

  const scopeCell = sheet.getRange(row, scopeColumn);

  if (!scopeCell.getValue()) {
    scopeCell.setValue(scope);
  }
}

function handleRegionFromType_(e, sheet, headers) {
  const typeColumn = headers.indexOf("Type") + 1;

  const regionColumn = headers.indexOf("Region") + 1;

  if (typeColumn === 0 || regionColumn === 0) {
    return;
  }

  if (e.range.getColumn() !== typeColumn) {
    return;
  }

  const row = e.range.getRow();

  if (row === 1) {
    return;
  }

  const type = e.value;

  if (!type) {
    return;
  }

  const region = TYPE_REGION_MAPPING[type];

  if (!region) {
    return;
  }

  const regionCell = sheet.getRange(row, regionColumn);

  if (!regionCell.getValue()) {
    regionCell.setValue(region);
  }
}

function handleDepartmentFromType_(e, sheet, headers) {
  const typeColumn = headers.indexOf("Type") + 1;

  const departmentColumn = headers.indexOf("Department") + 1;

  if (typeColumn === 0 || departmentColumn === 0) {
    return;
  }

  if (e.range.getColumn() !== typeColumn) {
    return;
  }

  const row = e.range.getRow();

  if (row === 1) {
    return;
  }

  const type = e.value;

  if (!type) {
    return;
  }

  const department = TYPE_DEPARTMENT_MAPPING[type];

  if (!department) {
    return;
  }

  const departmentCell = sheet.getRange(row, departmentColumn);

  if (!departmentCell.getValue()) {
    departmentCell.setValue(department);
  }
}
