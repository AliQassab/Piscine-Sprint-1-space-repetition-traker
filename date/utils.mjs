// Exports formatDate(dateStr)
// Converts date strings to readable format like: 21st June 2025
// Includes helper function ordinal(day)

export function formatDate(dateStr) {
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });

  const year = date.getFullYear();
  return `${day}${ordinal(day)} ${month} ${year}`;
}

function ordinal(day) {
  if (day > 3 && day < 21) return "th";

  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}
