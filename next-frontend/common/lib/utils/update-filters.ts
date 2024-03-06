export const getNewParams = (currPage: number, filters: any) => {
  return new URLSearchParams({
    page: currPage.toString(),
    ...filters.reduce(
      (acc: any, curr: any) => ({ ...acc, [curr.type]: curr.value }),
      {}
    ),
  }).toString();
};
