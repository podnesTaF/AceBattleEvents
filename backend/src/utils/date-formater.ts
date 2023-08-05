export function createDateFromDDMMYYYY(dateString?: string) {
  if (!dateString) return null;
  const parts = dateString.split('/');
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const year = parseInt(parts[2], 10);

  return new Date(year, month, day);
}
