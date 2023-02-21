import moment from "moment";

export function daysAgo(days: number) {
  return moment().subtract(days, "days").format("DD/MM/YYYY");
}
