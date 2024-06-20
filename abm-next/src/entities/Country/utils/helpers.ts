export const getCountryFlagSrc = (shortName?: string) => {
  if (!shortName) return "";
  return `https://flagcdn.com/${shortName.toLowerCase()}.svg`;
};
