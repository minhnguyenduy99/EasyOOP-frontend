export class TimeFormatUtils {
  /**
   * @param {number} date
   */
  static getFormattedTimespan(timeSpan) {
    const now = new Date();
    const firstDate = new Date(timeSpan);
    const yearSpan = now.getFullYear() - firstDate.getFullYear();
    const monthSpan = Math.abs(now.getMonth() - firstDate.getMonth());
    const daySpan = Math.abs(now.getDay() - firstDate.getDay());

    return new TimeSpan(yearSpan, monthSpan, daySpan);
  }
}

export class TimeSpan {
  year;
  month;
  day;
  constructor(year, month, day) {
    this.year = year;
    this.month = month;
    this.day = day;
  }

  format() {
    let str = "";
    str += this.year ? `${this.year} year${this.year === 1 ? "" : "s"} ` : "";
    str += this.month
      ? `${this.month} month${this.month === 1 ? "" : "s"} `
      : "";
    str +=
      this.day && !this.year
        ? `${this.day} day${this.day === 1 ? "" : "s"}`
        : "";

    return str;
  }
}
