function recordUsageMetric(metric) {
  UsageMetricService.record(metric);
}

function getCurrentWeek() {

    const date = new Date();

    const firstDayOfYear =
      new Date(date.getFullYear(), 0, 1);

    const days =
      Math.floor(
        (date - firstDayOfYear) /
        (24 * 60 * 60 * 1000)
      );

    const week =
      Math.ceil(
        (days + firstDayOfYear.getDay() + 1) / 7
      );

    return `${date.getFullYear()}-W${String(week).padStart(2, "0")}`;
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