export function round(value: number, digits: number) {
  let tempValue = value * Math.pow(10, digits);
  tempValue = Math.round(tempValue);
  tempValue = tempValue / Math.pow(10, digits);
  return tempValue;
}
