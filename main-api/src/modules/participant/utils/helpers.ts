export const generateUniqueBibNumber = (
  takenBibNumbers: { id: number; bibNumber: number }[],
): number => {
  // Define the range of possible bib numbers
  const minBibNumber = 50;
  const maxBibNumber = 1049; // Example range up to 1000 + 50

  // Convert to a Set for quick lookup
  const takenSet = new Set(takenBibNumbers.map((bib) => bib.bibNumber));

  // Generate list of available bib numbers
  const availableBibNumbers = [];
  for (let i = minBibNumber; i <= maxBibNumber; i++) {
    if (!takenSet.has(i)) {
      availableBibNumbers.push(i);
    }
  }

  // Randomly select an available bib number
  if (availableBibNumbers.length > 0) {
    const randomIndex = Math.floor(Math.random() * availableBibNumbers.length);
    return availableBibNumbers[randomIndex];
  } else {
    throw new Error('No available bib numbers');
  }
};
