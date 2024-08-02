const A = 1200; // Standardization constant
const baselineMileTimeMen = 240; // 4 minutes in seconds
const baselineMileTimeWomen = 276.3; // 4 minutes 36.3 seconds in seconds

const equivalentsMen = {
  400: 46.55,
  800: 108.33,
  1000: 140,
  1500: 222.5,
  1609.34: 240,
  3000: 476.9,
  5000: 818,
  10000: 1718,
};

const equivalentsWomen = {
  400: 53.35,
  800: 125,
  1000: 162.4,
  1500: 257,
  1609.34: 276.3,
  3000: 549.5,
  5000: 947,
  10000: 1995,
};

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

// Function to calculate performance points for a given 1-mile time
function calculatePerformancePoints(timeInSeconds, gender) {
  const baselineTime =
    gender === "men" ? baselineMileTimeMen : baselineMileTimeWomen;
  let performancePoints =
    A - (timeInSeconds * baselineMileTimeMen) / baselineTime;

  return performancePoints;
}

// Function to calculate adjusted performance points based on race type and conditions
function calculateAdjustedPerformancePoints(
  PP,
  raceType,
  shortTurnaround = false
) {
  let adjustedPP = PP;
  if (raceType === "presentational") {
    adjustedPP *= 1.01;
  } else if (raceType === "league") {
    adjustedPP *= 1.03;
  }
  if (shortTurnaround) {
    adjustedPP *= 1.05;
  }
  return adjustedPP;
}

// Function to calculate total points for a given race
function calculateTotalPoints(
  timeInSeconds,
  gender,
  raceType,
  shortTurnaround = false
) {
  let PP = calculatePerformancePoints(timeInSeconds, gender);
  const adjustedPP = calculateAdjustedPerformancePoints(
    PP,
    raceType,
    shortTurnaround
  );
  return adjustedPP;
}

// Function to calculate overall rating for an athlete
function calculateOverallRating(races) {
  let totalWeightedPoints = 0;
  let totalWeight = 0;

  races.forEach((race) => {
    const { time, gender, raceType, shortTurnaround, weight } = race;
    const totalPoints = calculateTotalPoints(
      time,
      gender,
      raceType,
      shortTurnaround
    );
    totalWeightedPoints += totalPoints * weight;
    totalWeight += weight;
  });

  const RRR = totalWeight === 0 ? 0 : totalWeightedPoints / totalWeight;
  const PFP = races.length * 10;
  const overallRating = RRR + PFP;

  return overallRating;
}

// Example usage
const athleteRaces = [
  { time: 240, gender: "men", raceType: "individual", weight: 1 },
  { time: 240, gender: "men", raceType: "presentational", weight: 1.01 },
  {
    time: 240,
    gender: "men",
    raceType: "league",
    shortTurnaround: false,
    weight: 1.03,
  },
  { time: 240, gender: "men", raceType: "individual", weight: 1 },
  {
    time: 240,
    gender: "men",
    raceType: "league",
    shortTurnaround: false,
    weight: 1.03,
  },
  { time: 240, gender: "men", raceType: "presentational", weight: 1.01 },
  {
    time: 240,
    gender: "men",
    raceType: "league",
    shortTurnaround: false,
    weight: 1.03,
  },
  { time: 240, gender: "men", raceType: "individual", weight: 1 },
  {
    time: 240,
    gender: "men",
    raceType: "league",
    shortTurnaround: true,
    weight: 1.03,
  },
  { time: 240, gender: "men", raceType: "presentational", weight: 1.01 },
  {
    time: 240,
    gender: "men",
    raceType: "league",
    shortTurnaround: false,
    weight: 1.03,
  },
  { time: 240, gender: "men", raceType: "individual", weight: 1 },
];

const athleteFemaleRaces = [
  { time: 400, gender: "women", raceType: "individual", weight: 1 },
  { time: 276, gender: "women", raceType: "presentational", weight: 1.01 },
  {
    time: 276,
    gender: "women",
    raceType: "league",
    shortTurnaround: true,
    weight: 1.03,
  },
  { time: 276, gender: "women", raceType: "individual", weight: 1 },
  {
    time: 276,
    gender: "women",
    raceType: "league",
    shortTurnaround: false,
    weight: 1.03,
  },
  { time: 276, gender: "women", raceType: "individual", weight: 1 },
  { time: 276, gender: "women", raceType: "presentational", weight: 1.01 },
  {
    time: 276,
    gender: "women",
    raceType: "league",
    shortTurnaround: false,
    weight: 1.03,
  },
  { time: 276, gender: "women", raceType: "individual", weight: 1 },
  {
    time: 276,
    gender: "women",
    raceType: "league",
    shortTurnaround: false,
    weight: 1.03,
  },
  { time: 276, gender: "women", raceType: "individual", weight: 1 },
  {
    time: 276,
    gender: "women",
    raceType: "league",
    shortTurnaround: false,
    weight: 1.03,
  },
  { time: 276, gender: "women", raceType: "individual", weight: 1 },
];

// Calculate overall rating for the athlete
const overallRatingMen = calculateOverallRating(athleteRaces);
console.log(
  `Overall Rating for the male athlete: ${overallRatingMen.toFixed(2)}`
);

const overallRatingWomen = calculateOverallRating(athleteFemaleRaces);
console.log(
  `Overall Rating for the female athlete: ${overallRatingWomen.toFixed(2)}`
);
