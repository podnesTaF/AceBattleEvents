import { RunnerPreview } from "@lib/models";

export const getRunnerGroupedData = (
  runners: RunnerPreview[]
): { [key: string]: RunnerPreview[] } => {
  const groupedData: { [key: string]: RunnerPreview[] } = {};

  // Group runners by the first letter of their surname
  runners.forEach((runner) => {
    const firstLetter = runner.user.surname[0].toUpperCase();
    if (firstLetter.match(/[A-Z]/)) {
      if (!groupedData[firstLetter]) {
        groupedData[firstLetter] = [];
      }
      groupedData[firstLetter].push(runner);
    }
  });

  // Sort the keys (letters) and then sort runners within each group
  const sortedGroupedData: { [key: string]: RunnerPreview[] } = {};
  Object.keys(groupedData)
    .sort((a, b) => a.localeCompare(b))
    .forEach((key) => {
      sortedGroupedData[key] = groupedData[key].sort((a, b) =>
        a.user.surname.toUpperCase().localeCompare(b.user.surname.toUpperCase())
      );
    });

  return sortedGroupedData;
};

export const transformGroupedData = (
  groupedData: ReturnType<typeof getRunnerGroupedData>
) => {
  return Object.keys(groupedData).map((key) => ({
    letter: key,
    data: groupedData[key],
  }));
};
