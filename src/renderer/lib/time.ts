import moment from "moment";

export function daysAgo(days: number) {
  return moment().subtract(days, "days").format("YYYY-MM-DD");
}

export function startOfCurrent(period: string) {
  switch (period) {
    case "year":
      return moment().startOf("year").format("YYYY-MM-DD");
    case "month":
      return moment().startOf("month").format("YYYY-MM-DD");
    case "week":
      return moment().startOf("week").format("YYYY-MM-DD");
    default:
      return undefined;
  }
}

export function startOfPrevious(period: string) {
  switch (period) {
    case "year":
      return moment().subtract(1, "year").startOf("year").format("YYYY-MM-DD");
    case "month":
      return moment().subtract(1, "month").startOf("month").format("YYYY-MM-DD");
    case "week":
      return moment().subtract(1, "week").startOf("week").format("YYYY-MM-DD");
    default:
      return undefined;
  }
}
