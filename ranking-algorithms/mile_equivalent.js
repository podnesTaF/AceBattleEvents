export const equivalentsMen = {
  400: 46.55,
  800: 108.33,
  1000: 140,
  1500: 222.5,
  1609.34: 240,
  3000: 476.9,
  5000: 818,
  10000: 1718,
};

export const equivalentsWomen = {
  400: 53.35,
  800: 125,
  1000: 162.4,
  1500: 257,
  1609.34: 276.3,
  3000: 549.5,
  5000: 947,
  10000: 1995,
};

const baselineMileTimeMen = 240;
const baselineMileTimeWomen = 276.3;

function getBaselineTime(distance, equivalents) {
  const distances = Object.keys(equivalents)
    .map(Number)
    .sort((a, b) => a - b);

  let d1, d2;
  for (let i = 0; i < distances.length - 1; i++) {
    if (distance >= distances[i] && distance <= distances[i + 1]) {
      d1 = distances[i];
      d2 = distances[i + 1];
      break;
    }
  }

  if (distance in equivalents) {
    return equivalents[distance];
  }

  if (!d1 || !d2) {
    if (distance < distances[0]) return equivalents[distances[0]];
    if (distance > distances[distances.length - 1])
      return equivalents[distances[distances.length - 1]];
  }

  const T1 = equivalents[d1];
  const T2 = equivalents[d2];
  const baselineTime = T1 + (T2 - T1) * ((distance - d1) / (d2 - d1));
  return baselineTime;
}

function getEquivalentMileTime(distance, actualTime, gender) {
  const equivalents = gender === "men" ? equivalentsMen : equivalentsWomen;
  const baselineMileTime =
    gender === "men" ? baselineMileTimeMen : baselineMileTimeWomen;
  const baselineTime = getBaselineTime(distance, equivalents);
  const equivalentMileTime = actualTime * (baselineMileTime / baselineTime);
  return equivalentMileTime;
}

// Function to format time in "mm:ss.ms" format
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = (seconds % 60).toFixed(2);
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}

const distance = 740; // Distance in meters
const actualTime = 105; // Actual time in seconds
const gender = "men"; // Gender: 'men' or 'women'

const equivalentMileTime = getEquivalentMileTime(distance, actualTime, gender);
const formattedTime = formatTime(equivalentMileTime);
console.log(
  `Equivalent of ${formatTime(
    actualTime
  )} for ${distance}m in ${gender}'s category is 1-mile time: ${formattedTime}`
);
