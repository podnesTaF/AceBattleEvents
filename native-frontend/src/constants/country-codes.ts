export const countryCodes = [
  // European Countries
  { label: "AT (+43)", value: "+43" }, // Austria
  { label: "BE (+32)", value: "+32" }, // Belgium
  { label: "BG (+359)", value: "+359" }, // Bulgaria
  { label: "HR (+385)", value: "+385" }, // Croatia
  { label: "CY (+357)", value: "+357" }, // Cyprus
  { label: "CZ (+420)", value: "+420" }, // Czech Republic
  { label: "DK (+45)", value: "+45" }, // Denmark
  { label: "EE (+372)", value: "+372" }, // Estonia
  { label: "FI (+358)", value: "+358" }, // Finland
  { label: "FR (+33)", value: "+33" }, // France
  { label: "DE (+49)", value: "+49" }, // Germany
  { label: "GR (+30)", value: "+30" }, // Greece
  { label: "HU (+36)", value: "+36" }, // Hungary
  { label: "IS (+354)", value: "+354" }, // Iceland
  { label: "IE (+353)", value: "+353" }, // Ireland
  { label: "IT (+39)", value: "+39" }, // Italy
  { label: "LV (+371)", value: "+371" }, // Latvia
  { label: "LT (+370)", value: "+370" }, // Lithuania
  { label: "LU (+352)", value: "+352" }, // Luxembourg
  { label: "MT (+356)", value: "+356" }, // Malta
  { label: "NL (+31)", value: "+31" }, // Netherlands
  { label: "NO (+47)", value: "+47" }, // Norway
  { label: "PL (+48)", value: "+48" }, // Poland
  { label: "PT (+351)", value: "+351" }, // Portugal
  { label: "RO (+40)", value: "+40" }, // Romania
  { label: "SK (+421)", value: "+421" }, // Slovakia
  { label: "SI (+386)", value: "+386" }, // Slovenia
  { label: "ES (+34)", value: "+34" }, // Spain
  { label: "SE (+46)", value: "+46" }, // Sweden
  { label: "CH (+41)", value: "+41" }, // Switzerland
  { label: "GB (+44)", value: "+44" }, // United Kingdom

  // Other Popular Countries
  { label: "AU (+61)", value: "+61" }, // Australia
  { label: "BR (+55)", value: "+55" }, // Brazil
  { label: "CA (+1)", value: "+1" }, // Canada
  { label: "CN (+86)", value: "+86" }, // China
  { label: "IN (+91)", value: "+91" }, // India
  { label: "JP (+81)", value: "+81" }, // Japan
  { label: "MX (+52)", value: "+52" }, // Mexico
  { label: "NZ (+64)", value: "+64" }, // New Zealand
  { label: "RU (+7)", value: "+7" }, // Russia
  { label: "ZA (+27)", value: "+27" }, // South Africa
  { label: "KR (+82)", value: "+82" }, // South Korea
  { label: "US (+1)", value: "+1" }, // United States
];

export type PickItem = {
  id: number;
  title: string;
  additionalInfo?: string;
  imageUrl?: string;
};

export const availableCountries: PickItem[] = [
  // European Countries
  { id: 1, title: "Austria", additionalInfo: "AT" },
  { id: 2, title: "Belgium", additionalInfo: "BE" },
  { id: 3, title: "Bulgaria", additionalInfo: "BG" },
  { id: 4, title: "Croatia", additionalInfo: "HR" },
  { id: 5, title: "Cyprus", additionalInfo: "CY" },
  { id: 6, title: "Czech Republic", additionalInfo: "CZ" },
  { id: 7, title: "Denmark", additionalInfo: "DK" },
  { id: 8, title: "Estonia", additionalInfo: "EE" },
  { id: 9, title: "Finland", additionalInfo: "FI" },
  { id: 10, title: "France", additionalInfo: "FR" },
  { id: 11, title: "Germany", additionalInfo: "DE" },
  { id: 12, title: "Greece", additionalInfo: "GR" },
  { id: 13, title: "Hungary", additionalInfo: "HU" },
  { id: 14, title: "Iceland", additionalInfo: "IS" },
  { id: 15, title: "Ireland", additionalInfo: "IE" },
  { id: 16, title: "Italy", additionalInfo: "IT" },
  { id: 17, title: "Latvia", additionalInfo: "LV" },
  { id: 18, title: "Lithuania", additionalInfo: "LT" },
  { id: 19, title: "Luxembourg", additionalInfo: "LU" },
  { id: 20, title: "Malta", additionalInfo: "MT" },
  { id: 21, title: "Netherlands", additionalInfo: "NL" },
  { id: 22, title: "Norway", additionalInfo: "NO" },
  { id: 23, title: "Poland", additionalInfo: "PL" },
  { id: 24, title: "Portugal", additionalInfo: "PT" },
  { id: 25, title: "Romania", additionalInfo: "RO" },
  { id: 26, title: "Slovakia", additionalInfo: "SK" },
  { id: 27, title: "Slovenia", additionalInfo: "SI" },
  { id: 28, title: "Spain", additionalInfo: "ES" },
  { id: 29, title: "Sweden", additionalInfo: "SE" },
  { id: 30, title: "Switzerland", additionalInfo: "CH" },
  { id: 31, title: "United Kingdom", additionalInfo: "GB" },

  // Other Popular Countries
  { id: 32, title: "Australia", additionalInfo: "AU" },
  { id: 33, title: "Brazil", additionalInfo: "BR" },
  { id: 34, title: "Canada", additionalInfo: "CA" },
  { id: 35, title: "China", additionalInfo: "CN" },
  { id: 36, title: "India", additionalInfo: "IN" },
  { id: 37, title: "Japan", additionalInfo: "JP" },
  { id: 38, title: "Mexico", additionalInfo: "MX" },
  { id: 39, title: "New Zealand", additionalInfo: "NZ" },
  { id: 40, title: "Russia", additionalInfo: "RU" },
  { id: 41, title: "South Africa", additionalInfo: "ZA" },
  { id: 42, title: "South Korea", additionalInfo: "KR" },
  { id: 43, title: "United States", additionalInfo: "US" },
];

export default countryCodes;
