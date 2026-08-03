function onEdit(e) {

  const sheet = e.range.getSheet();

  if (sheet.getName() !== CONFIG.SHEET_NAME) {
    return;
  }

  const headers =
    sheet
      .getRange(1, 1, 1, sheet.getLastColumn())
      .getValues()[0];

  const tournamentIdColumn =
    headers.indexOf("TournamentId") + 1;

  const creationDateColumn =
    headers.indexOf("CreationDate") + 1;

  if (
    tournamentIdColumn === 0 ||
    creationDateColumn === 0
  ) {
    return;
  }

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

  const creationDateCell =
    sheet.getRange(
      row,
      creationDateColumn
    );

  if (!creationDateCell.getValue()) {

    creationDateCell.setValue(
      new Date(
		  Utilities.formatDate(
			new Date(),
			Session.getScriptTimeZone(),
			"yyyy-MM-dd"
		  )
		)
    );
  }
}