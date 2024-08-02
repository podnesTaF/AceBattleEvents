import { equivalentsMen, equivalentsWomen } from "./mile_equivalent.js";

function calculateWomenMultiplier() {
  const distances = Object.keys(equivalentsMen);
  let totalRatio = 0;
  distances.forEach((distance) => {
    const ratio = equivalentsWomen[distance] / equivalentsMen[distance];
    totalRatio += ratio;
  });
  return totalRatio / distances.length;
}

const womenMultiplier = calculateWomenMultiplier();

export { womenMultiplier };
