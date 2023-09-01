export function createDateFromDDMMYYYY(dateString?: string) {
  if (!dateString) return null;
  const parts = dateString.split('/');
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const year = parseInt(parts[2], 10);

  return new Date(year, month, day);
}

export const formatDate = (dateString?: string | Date): string => {
  if (!dateString) return '';
  const date = new Date(dateString);

  const formattedDate: string = date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const formattedTime: string = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  return `${formattedDate}, ${formattedTime}`;
};
