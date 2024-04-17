export const getParamsFromFilters = (filters: any[]): string => {
  const params: string = filters.reduce(
    (acc: string, curr: { type: string; value: string }, i: number) =>
      i === 0
        ? acc + `${curr.type}=${curr.value}`
        : acc + `&${curr.type}=${curr.value}`,
    ""
  );

  return params;
};
