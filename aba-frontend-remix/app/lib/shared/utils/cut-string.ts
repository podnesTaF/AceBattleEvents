export const cutString = (str: string, length: number) => {
  if (str.length - 3 > length) {
    return `${str.slice(0, length)}...`;
  }

  return str;
};
