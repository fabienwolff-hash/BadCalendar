function recordUsageMetric(metric) {
  UsageMetricService.record(metric);
}

function getCurrentWeek() {

  const date = new Date();
  const day = date.getDay();

  const diff =
    day === 0
      ? -6  // dimanche -> lundi précédent
      : 1 - day;

  const monday = new Date(date);

  monday.setDate(date.getDate() + diff);
  monday.setHours(0, 0, 0, 0);

  return monday;
}

const UsageMetricService = {

  getSheet() {
    const spreadsheet = SpreadsheetApp.openById(CONFIG.USAGE_METRICS_SPREADSHEET_ID);

    return spreadsheet.getSheetByName(CONFIG.USAGE_METRICS_SHEET_NAME);
  },

  record(metric) {

    try {
      const event = {
          timestamp: new Date(),
          week: getCurrentWeek(),
          version: CONFIG.APP_VERSION,

          visitorId: metric.visitorId,
          sessionId: metric.sessionId,

          deviceType: metric.deviceType,
          os: metric.os,
          browser: metric.browser,

          action: metric.action,
          value: metric.value || ""
      };

      const sheet = this.getSheet();

      if (!sheet) {
        throw new Error(
          `Sheet '${CONFIG.USAGE_METRICS_SHEET_NAME}' not found`
        );
      }

        sheet.appendRow([
          event.timestamp,
          event.week,
          event.version,

          event.visitorId,
          event.sessionId,

          event.deviceType,
          event.os,
          event.browser,

          event.action,
          event.value
        ]);
      }

      catch(error) {
        Logger.log(error);
      }
  }
};