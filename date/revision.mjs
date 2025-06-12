// Exports getRevisionDates(startDate)
// Generates spaced repetition dates (1 week, 1 month, etc.)
// Returns revision dates as an array of objects

export function getRevisionDates(startDate, topic) {
  const start = new Date(startDate);
  const todayStr = new Date().toISOString().split("T")[0];
  const toISO = (date) => date.toISOString().split("T")[0];

  const intervals = [
    { days: 7 },
    { months: 1 },
    { months: 3 },
    { months: 6 },
    { years: 1 },
  ];
  const revisions = [];
  for (const interval of intervals) {
    const date = new Date(start); // clone the start date
    // Apply the interval (only one key per object)
    if (interval.days) {
      date.setDate(date.getDate() + interval.days);
    } else if (interval.months) {
      date.setMonth(date.getMonth() + interval.months);
    } else if (interval.years) {
      date.setFullYear(date.getFullYear() + interval.years);
    }
    const dateStr = toISO(date);
    // Only include if the date is today or in the future
    if (dateStr >= todayStr) {
      revisions.push({
        topic,
        date: dateStr,
      });
    }
  }
  return revisions;
}
