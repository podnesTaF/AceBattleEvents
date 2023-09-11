export const getNewParams = (
  currPage: number,
  filters: any,
  scrollY: number
) => {
  return new URLSearchParams({
    page: currPage.toString(),
    scrollY: scrollY.toString(),
    ...filters.reduce(
      (acc: any, curr: any) => ({ ...acc, [curr.type]: curr.value }),
      {}
    ),
  }).toString();
};
