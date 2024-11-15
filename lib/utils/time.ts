export function formatTimeObj(secs: number) {
  const minutes = Math.floor(secs / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const formattedTime = {
    days: days,
    hours: hours % 24,
    minutes: minutes % 60,
    seconds: Math.floor(secs % 60),
  };

  return formattedTime;
}

export function replaceTimeUnitToSingleChar(
  timeStr: string,
  isUpperCase = false,
) {
  const str = timeStr
    .replace("days", "d")
    .replace("day", "d")
    .replace("hours", "h")
    .replace("hour", "h")
    .replace("minutes", "m")
    .replace("minute", "m")
    .replace("seconds", "s")
    .replace("second", "s");

  return isUpperCase ? str.toUpperCase() : str;
}
