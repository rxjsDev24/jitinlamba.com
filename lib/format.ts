const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function formatMonth(isoMonth: string): string {
  const [year, month] = isoMonth.split("-");
  return `${months[Number(month) - 1]} ${year}`;
}

export function formatPeriod(start: string, end?: string): string {
  return `${formatMonth(start)} – ${end ? formatMonth(end) : "Present"}`;
}

export function splitHighlight(text: string): { lead?: string; body: string } {
  const match = /^([A-Z][^:]{0,40}):\s+(.*)$/.exec(text);
  return match ? { lead: match[1], body: match[2] } : { body: text };
}
