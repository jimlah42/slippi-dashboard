import moment from "moment";

export function daysAgo(days: number) {
  return moment().subtract(days, "days").format("YYYY-MM-DD");
}
