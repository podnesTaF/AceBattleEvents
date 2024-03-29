export const countryCodes = [
  { label: "AE (+971)", value: "+971" },
  { label: "AL (+355)", value: "+355" },
  { label: "AM (+374)", value: "+374" },
  { label: "AR (+54)", value: "+54" },
  { label: "AT (+43)", value: "+43" },
  { label: "AU (+61)", value: "+61" },
  { label: "AZ (+994)", value: "+994" },
  { label: "BA (+387)", value: "+387" },
  { label: "BE (+32)", value: "+32" },
  { label: "BG (+359)", value: "+359" },
  { label: "BR (+55)", value: "+55" },
  { label: "BY (+375)", value: "+375" },
  { label: "CA (+1)", value: "+1" },
  { label: "CH (+41)", value: "+41" },
  { label: "CL (+56)", value: "+56" },
  { label: "CN (+86)", value: "+86" },
  { label: "CO (+57)", value: "+57" },
  { label: "CY (+357)", value: "+357" },
  { label: "CZ (+420)", value: "+420" },
  { label: "DE (+49)", value: "+49" },
  { label: "DK (+45)", value: "+45" },
  { label: "EE (+372)", value: "+372" },
  { label: "EG (+20)", value: "+20" },
  { label: "ES (+34)", value: "+34" },
  { label: "FI (+358)", value: "+358" },
  { label: "FR (+33)", value: "+33" },
  { label: "GB (+44)", value: "+44" },
  { label: "GE (+995)", value: "+995" },
  { label: "GR (+30)", value: "+30" },
  { label: "HR (+385)", value: "+385" },
  { label: "HU (+36)", value: "+36" },
  { label: "ID (+62)", value: "+62" },
  { label: "IE (+353)", value: "+353" },
  { label: "IN (+91)", value: "+91" },
  { label: "IS (+354)", value: "+354" },
  { label: "IT (+39)", value: "+39" },
  { label: "JP (+81)", value: "+81" },
  { label: "KR (+82)", value: "+82" },
  { label: "LT (+370)", value: "+370" },
  { label: "LU (+352)", value: "+352" },
  { label: "LV (+371)", value: "+371" },
  { label: "MD (+373)", value: "+373" },
  { label: "ME (+382)", value: "+382" },
  { label: "MK (+389)", value: "+389" },
  { label: "MT (+356)", value: "+356" },
  { label: "MX (+52)", value: "+52" },
  { label: "MY (+60)", value: "+60" },
  { label: "NG (+234)", value: "+234" },
  { label: "NL (+31)", value: "+31" },
  { label: "NO (+47)", value: "+47" },
  { label: "NZ (+64)", value: "+64" },
  { label: "PE (+51)", value: "+51" },
  { label: "PH (+63)", value: "+63" },
  { label: "PK (+92)", value: "+92" },
  { label: "PL (+48)", value: "+48" },
  { label: "PT (+351)", value: "+351" },
  { label: "RO (+40)", value: "+40" },
  { label: "RS (+381)", value: "+381" },
  { label: "RU (+7)", value: "+7" },
  { label: "SA (+966)", value: "+966" },
  { label: "SE (+46)", value: "+46" },
  { label: "SG (+65)", value: "+65" },
  { label: "SI (+386)", value: "+386" },
  { label: "SK (+421)", value: "+421" },
  { label: "TH (+66)", value: "+66" },
  { label: "TR (+90)", value: "+90" },
  { label: "UA (+380)", value: "+380" },
  { label: "US (+1)", value: "+1" },
  { label: "VN (+84)", value: "+84" },
  { label: "ZA (+27)", value: "+27" },
];

export type PickItem = {
  id: number;
  title: string;
  additionalInfo?: string;
  imageUrl?: string;
};

export const availableCountries: PickItem[] = [
  { id: 45, title: "Albania", additionalInfo: "AL" },
  { id: 55, title: "Argentina", additionalInfo: "AR" },
  { id: 46, title: "Armenia", additionalInfo: "AM" },
  { id: 32, title: "Australia", additionalInfo: "AU" },
  { id: 1, title: "Austria", additionalInfo: "AT" },
  { id: 47, title: "Azerbaijan", additionalInfo: "AZ" },
  { id: 48, title: "Belarus", additionalInfo: "BY" },
  { id: 2, title: "Belgium", additionalInfo: "BE" },
  { id: 49, title: "Bosnia and Herzegovina", additionalInfo: "BA" },
  { id: 33, title: "Brazil", additionalInfo: "BR" },
  { id: 3, title: "Bulgaria", additionalInfo: "BG" },
  { id: 34, title: "Canada", additionalInfo: "CA" },
  { id: 56, title: "Chile", additionalInfo: "CL" },
  { id: 35, title: "China", additionalInfo: "CN" },
  { id: 57, title: "Colombia", additionalInfo: "CO" },
  { id: 4, title: "Croatia", additionalInfo: "HR" },
  { id: 5, title: "Cyprus", additionalInfo: "CY" },
  { id: 6, title: "Czech Republic", additionalInfo: "CZ" },
  { id: 7, title: "Denmark", additionalInfo: "DK" },
  { id: 58, title: "Egypt", additionalInfo: "EG" },
  { id: 8, title: "Estonia", additionalInfo: "EE" },
  { id: 9, title: "Finland", additionalInfo: "FI" },
  { id: 10, title: "France", additionalInfo: "FR" },
  { id: 50, title: "Georgia", additionalInfo: "GE" },
  { id: 11, title: "Germany", additionalInfo: "DE" },
  { id: 12, title: "Greece", additionalInfo: "GR" },
  { id: 13, title: "Hungary", additionalInfo: "HU" },
  { id: 14, title: "Iceland", additionalInfo: "IS" },
  { id: 36, title: "India", additionalInfo: "IN" },
  { id: 59, title: "Indonesia", additionalInfo: "ID" },
  { id: 15, title: "Ireland", additionalInfo: "IE" },
  { id: 16, title: "Italy", additionalInfo: "IT" },
  { id: 37, title: "Japan", additionalInfo: "JP" },
  { id: 17, title: "Latvia", additionalInfo: "LV" },
  { id: 18, title: "Lithuania", additionalInfo: "LT" },
  { id: 19, title: "Luxembourg", additionalInfo: "LU" },
  { id: 60, title: "Malaysia", additionalInfo: "MY" },
  { id: 20, title: "Malta", additionalInfo: "MT" },
  { id: 38, title: "Mexico", additionalInfo: "MX" },
  { id: 51, title: "Moldova", additionalInfo: "MD" },
  { id: 52, title: "Montenegro", additionalInfo: "ME" },
  { id: 21, title: "Netherlands", additionalInfo: "NL" },
  { id: 39, title: "New Zealand", additionalInfo: "NZ" },
  { id: 61, title: "Nigeria", additionalInfo: "NG" },
  { id: 53, title: "North Macedonia", additionalInfo: "MK" },
  { id: 22, title: "Norway", additionalInfo: "NO" },
  { id: 62, title: "Pakistan", additionalInfo: "PK" },
  { id: 63, title: "Peru", additionalInfo: "PE" },
  { id: 64, title: "Philippines", additionalInfo: "PH" },
  { id: 23, title: "Poland", additionalInfo: "PL" },
  { id: 24, title: "Portugal", additionalInfo: "PT" },
  { id: 25, title: "Romania", additionalInfo: "RO" },
  { id: 40, title: "Russia", additionalInfo: "RU" },
  { id: 65, title: "Saudi Arabia", additionalInfo: "SA" },
  { id: 54, title: "Serbia", additionalInfo: "RS" },
  { id: 66, title: "Singapore", additionalInfo: "SG" },
  { id: 26, title: "Slovakia", additionalInfo: "SK" },
  { id: 27, title: "Slovenia", additionalInfo: "SI" },
  { id: 41, title: "South Africa", additionalInfo: "ZA" },
  { id: 42, title: "South Korea", additionalInfo: "KR" },
  { id: 28, title: "Spain", additionalInfo: "ES" },
  { id: 29, title: "Sweden", additionalInfo: "SE" },
  { id: 30, title: "Switzerland", additionalInfo: "CH" },
  { id: 67, title: "Thailand", additionalInfo: "TH" },
  { id: 68, title: "Turkey", additionalInfo: "TR" },
  { id: 44, title: "Ukraine", additionalInfo: "UA" },
  { id: 69, title: "United Arab Emirates", additionalInfo: "AE" },
  { id: 31, title: "United Kingdom", additionalInfo: "GB" },
  { id: 43, title: "United States", additionalInfo: "US" },
  { id: 70, title: "Vietnam", additionalInfo: "VN" },
];

export default countryCodes;
