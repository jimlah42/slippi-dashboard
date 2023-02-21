import { round } from "./round";

export function asPercentage(numerator: number, denominator: number): number {
  if (denominator == 0) {
    return 100;
  }

  return round((numerator / denominator) * 100, 2);
}
