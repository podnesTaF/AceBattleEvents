export const users = [
  {
    id: 1,
    name: "Oleg",
    surname: "Kayafa",
    runner: {
      rank: 1,
      dateOfBirth: "1992-09-23T00:00:00.000Z",
    },
  },
  {
    id: 2,
    name: "Dmyrtiy",
    surname: "Nicolaychuk",
    runner: {
      rank: 2,
      dateOfBirth: "1997-09-23T00:00:00.000Z",
    },
    image: {
      id: 113,
      title: "nikolajchuk-dmitrij.jpg",
      mediaUrl:
        "https://storage.googleapis.com/abe_cloud_storage/image/large/56ff5950-ba01-483b-98e2-cfd12a5bc82e.jpg",
      smallUrl:
        "https://storage.googleapis.com/abe_cloud_storage/image/small/small_56ff5950-ba01-483b-98e2-cfd12a5bc82e.jpg",
      mediaType: "image",
    },
  },
  {
    id: 3,
    name: "Giovanni",
    surname: "Gatto",
    runner: {
      rank: 3,
      dateOfBirth: "2002-09-23T00:00:00.000Z",
    },
    image: {
      id: 118,
      title: "kogut-tetiana.jpg",
      mediaUrl:
        "https://storage.googleapis.com/abe_cloud_storage/image/large/1848e3d2-4fea-4c7f-85f3-c93c4632c9bb.jpg",
      smallUrl:
        "https://storage.googleapis.com/abe_cloud_storage/image/small/small_1848e3d2-4fea-4c7f-85f3-c93c4632c9bb.jpg",
      mediaType: "image",
    },
  },
];

export const managers: any = [
  {
    id: 1,
    name: "Oleksii",
    surname: "Kulivets",
    email: "oleksii_kulivets@gmail.com",
    description: "manager",
    image: {
      id: 113,
      title: "nikolajchuk-dmitrij.jpg",
      mediaUrl:
        "https://storage.googleapis.com/abe_cloud_storage/image/large/56ff5950-ba01-483b-98e2-cfd12a5bc82e.jpg",
      smallUrl:
        "https://storage.googleapis.com/abe_cloud_storage/image/small/small_56ff5950-ba01-483b-98e2-cfd12a5bc82e.jpg",
      mediaType: "image",
    },
  },
  {
    id: 2,
    name: "Oleksii",
    surname: "Kulivets",
    email: "oleksii_kulivets@gmail.com",
    description: "Coach of the Kyiv teams",
  },
];

export const runners: any[] = [
  {
    id: 10,
    dateOfBirth: "2001-01-17 00:00:00.000",
    gender: "male",
    worldAthleticsUrl:
      "https://worldathletics.org/athletes/ukraine/dmytrii-nikolaichuk-14596852",
    category: "professional",
    totalPoints: 252520,
    rank: 2,
    user: {
      id: 10,
      name: "Dmytriy",
      surname: "Nikolaychuk",
      email: "dn@gmail.com",
      role: "runner",
      interest: null,
      verified: false,
      city: "Kyiv",
      password: "$2b$10$vgZ65ufuNtmb3orscAM11OeI05itNUffR2AkE1xqTzAJ7rkdcGoPy",
      createdAt: "2023-08-18T08:29:02.528Z",
      updatedAt: "2023-10-01T10:07:40.000Z",
      acceptTerms: false,
      acceptNews: false,
      image: {
        id: 113,
        title: "nikolajchuk-dmitrij.jpg",
        mediaUrl:
          "https://storage.googleapis.com/abe_cloud_storage/image/large/56ff5950-ba01-483b-98e2-cfd12a5bc82e.jpg",
        smallUrl:
          "https://storage.googleapis.com/abe_cloud_storage/image/small/small_56ff5950-ba01-483b-98e2-cfd12a5bc82e.jpg",
        mediaType: "image",
      },
      country: {
        id: 3,
        name: "Ukraine",
        code: "UKR",
        flagIconUrl: "https://flagcdn.com/ua.svg",
      },
    },
    teamsAsRunner: [
      {
        id: 43,
        name: "Kyiv-Men",
        gender: "male",
        city: "Kyiv",
        totalPoints: 1220000,
        rank: 1,
      },
    ],
  },
  {
    id: 45,
    dateOfBirth: "2003-10-02 00:00:00.000",
    gender: "female",
    worldAthleticsUrl:
      "https://worldathletics.org/athletes/ukraine/tetiana-chornovol-14894572",
    category: "professional",
    totalPoints: 295533,
    rank: 2,
    user: {
      id: 45,
      name: "Tetiana",
      surname: "CHORNOVOL",
      email: "tet@gmail.com",
      role: "runner",
      interest: null,
      verified: false,
      city: "Kyiv",
      password: "$2b$10$Ds1a0bJv.XjUL0rf2pLrK.1QtiGm3aMSKy5lwPh8SNVul30fAB9pu",
      createdAt: "2023-08-20T08:50:16.664Z",
      updatedAt: "2023-10-01T09:53:42.306Z",
      acceptTerms: false,
      acceptNews: false,
      image: null,
      country: {
        id: 3,
        name: "Ukraine",
        code: "UKR",
        flagIconUrl: "https://flagcdn.com/ua.svg",
      },
    },
    teamsAsRunner: [
      {
        id: 44,
        name: "Kyiv-Women",
        gender: "female",
        city: "Kyiv",
        totalPoints: 1448250,
        rank: 1,
      },
    ],
  },
  {
    id: 43,
    dateOfBirth: "2003-03-18 00:00:00.000",
    gender: "female",
    worldAthleticsUrl:
      "https://worldathletics.org/athletes/ukraine/tetiana-kohut-14848656",
    category: "professional",
    totalPoints: 296650,
    rank: 3,
    user: {
      id: 43,
      name: "Tetiana",
      surname: "KOHUT",
      email: "kog@gmail.com",
      role: "runner",
      interest: null,
      verified: false,
      city: "Kyiv",
      password: "$2b$10$A1fHseP6tdbS6tNSmVpeku7jC3CUntgVCgpQMLYLCxrjWkF4eFo6e",
      createdAt: "2023-08-20T08:50:16.655Z",
      updatedAt: "2023-10-01T09:53:42.511Z",
      acceptTerms: false,
      acceptNews: false,
      image: {
        id: 118,
        title: "kogut-tetiana.jpg",
        mediaUrl:
          "https://storage.googleapis.com/abe_cloud_storage/image/large/1848e3d2-4fea-4c7f-85f3-c93c4632c9bb.jpg",
        smallUrl:
          "https://storage.googleapis.com/abe_cloud_storage/image/small/small_1848e3d2-4fea-4c7f-85f3-c93c4632c9bb.jpg",
        mediaType: "image",
      },
      country: {
        id: 3,
        name: "Ukraine",
        code: "UKR",
        flagIconUrl: "https://flagcdn.com/ua.svg",
      },
    },
    teamsAsRunner: [
      {
        id: 44,
        name: "Kyiv-Women",
        gender: "female",
        city: "Kyiv",
        totalPoints: 1448250,
        rank: 1,
      },
    ],
  },
];

export const teams: any[] = [
  {
    id: 42,
    name: "Brussels-Men",
    gender: "male",
    city: "Brussels",
    totalPoints: 1255365,
    rank: 2,
    country: {
      id: 1,
      name: "Belgium",
      code: "BEL",
      flagIconUrl: "https://flagcdn.com/be.svg",
    },
    coach: {
      id: 34,
      name: "Jan",
      surname: "Wandan",
    },
    players: [
      {
        id: 79,
        dateOfBirth: "2006-02-02 00:00:00.000",
        gender: "male",
        worldAthleticsUrl:
          "https://worldathletics.org/athletes/great-britain-ni/miles-waterworth-14987623",
        category: "professional",
        totalPoints: 275118,
        rank: 17,
      },
      {
        id: 80,
        dateOfBirth: "2006-10-28 00:00:00.000",
        gender: "male",
        worldAthleticsUrl:
          "https://worldathletics.org/athletes/great-britain-ni/owen-wallek-15101823",
        category: "professional",
        totalPoints: 270747,
        rank: 13,
      },
      {
        id: 81,
        dateOfBirth: "2000-09-12 00:00:00.000",
        gender: "male",
        worldAthleticsUrl:
          "https://worldathletics.org/athletes/great-britain-ni/max-heyden-14762882",
        category: "professional",
        totalPoints: 254500,
        rank: 3,
      },
      {
        id: 82,
        dateOfBirth: "2004-09-27 00:00:00.000",
        gender: "male",
        worldAthleticsUrl:
          "https://worldathletics.org/athletes/spain/aleix-vives-14968296",
        category: "professional",
        totalPoints: 273459,
        rank: 16,
      },
      {
        id: 83,
        dateOfBirth: "2004-02-15 00:00:00.000",
        gender: "male",
        worldAthleticsUrl:
          "https://worldathletics.org/athletes/spain/ruben-leonardo-14948531",
        category: "professional",
        totalPoints: 260220,
        rank: 8,
      },
      {
        id: 84,
        dateOfBirth: "1999-10-10 00:00:00.000",
        gender: "male",
        worldAthleticsUrl:
          "https://worldathletics.org/athletes/italy/giovanni-gatto-14763496",
        category: "professional",
        totalPoints: 262366,
        rank: 11,
      },
      {
        id: 85,
        dateOfBirth: "2000-08-25 00:00:00.000",
        gender: "male",
        worldAthleticsUrl:
          "https://worldathletics.org/athletes/italy/filippo-gandini-14848944",
        category: "professional",
        totalPoints: 273085,
        rank: 15,
      },
      {
        id: 86,
        dateOfBirth: "1995-08-10 00:00:00.000",
        gender: "male",
        worldAthleticsUrl:
          "https://worldathletics.org/athletes/portugal/andre-pereira-14531966",
        category: "professional",
        totalPoints: 255400,
        rank: 4,
      },
      {
        id: 87,
        dateOfBirth: "2005-06-18 00:00:00.000",
        gender: "male",
        worldAthleticsUrl:
          "https://worldathletics.org/athletes/belgium/achille-lelion-15060297",
        category: "professional",
        totalPoints: 272112,
        rank: 14,
      },
    ],
    logo: {
      id: 91,
      title: "brussels_club.png",
      mediaUrl:
        "https://storage.googleapis.com/abe_cloud_storage/image/large/d529f8ff-2c17-416b-addc-c847196b0cf2.png",
      smallUrl:
        "https://storage.googleapis.com/abe_cloud_storage/image/small/small_d529f8ff-2c17-416b-addc-c847196b0cf2.png",
      mediaType: "image",
    },
    events: [
      {
        id: 25,
        title: "Brussels Mile",
        description:
          "The First Ace Battle Mile competition in Europe. Top athletes are invited to run a mile together in the running battle.",
        category: "outdoor",
        startDateTime: "2023-09-23T16:00:00.000Z",
        endDate: "2023-09-23T20:00:00.000Z",
      },
    ],
    personalBest: {
      id: 22,
      resultInMs: 1251300,
    },
  },
  {
    id: 43,
    name: "Kyiv-Men",
    gender: "male",
    city: "Kyiv",
    totalPoints: 1220000,
    rank: 1,
    country: {
      id: 1,
      name: "Belgium",
      code: "BEL",
      flagIconUrl: "https://flagcdn.com/be.svg",
    },
    coach: {
      id: 16,
      name: "Vitaliy",
      surname: "Sabulyak",
    },
    players: [
      {
        id: 9,
        dateOfBirth: "2001-01-17 00:00:00.000",
        gender: "male",
        worldAthleticsUrl:
          "https://worldathletics.org/athletes/ukraine/oleksandr-honskyy-14824354",
        category: "professional",
        totalPoints: 257785,
        rank: 6,
      },
      {
        id: 10,
        dateOfBirth: "2001-01-17 00:00:00.000",
        gender: "male",
        worldAthleticsUrl:
          "https://worldathletics.org/athletes/ukraine/dmytrii-nikolaichuk-14596852",
        category: "professional",
        totalPoints: 252520,
        rank: 2,
      },
      {
        id: 11,
        dateOfBirth: "1996-07-02 00:00:00.000",
        gender: "male",
        worldAthleticsUrl: "",
        category: "professional",
        totalPoints: 256975,
        rank: 5,
      },
      {
        id: 12,
        dateOfBirth: "2000-01-01 00:00:00.000",
        gender: "male",
        worldAthleticsUrl:
          "https://worldathletics.org/athletes/ukraine/andriy-krakovetskyy-14779410",
        category: "professional",
        totalPoints: 260381,
        rank: 9,
      },
      {
        id: 13,
        dateOfBirth: "1992-02-01 00:00:00.000",
        gender: "male",
        worldAthleticsUrl:
          "https://worldathletics.org/athletes/netherlands/jurjen-polderman-14372335",
        category: "professional",
        totalPoints: 248970,
        rank: 1,
      },
      {
        id: 75,
        dateOfBirth: "2003-01-13 00:00:00.000",
        gender: "male",
        worldAthleticsUrl:
          "https://worldathletics.org/athletes/ukraine/vasyl-voitiuk-14948081",
        category: "professional",
        totalPoints: 258344,
        rank: 7,
      },
      {
        id: 88,
        dateOfBirth: "2002-03-09 00:00:00.000",
        gender: "male",
        worldAthleticsUrl:
          "https://worldathletics.org/athletes/netherlands/jurgen-wielart-14429680",
        category: "professional",
        totalPoints: 263828,
        rank: 12,
      },
      {
        id: 89,
        dateOfBirth: "2005-08-19 00:00:00.000",
        gender: "male",
        worldAthleticsUrl:
          "https://worldathletics.org/athletes/netherlands/jamie-sesay-14868550",
        category: "professional",
        totalPoints: 262187,
        rank: 10,
      },
    ],
    logo: {
      id: 92,
      title: "kyiv_club.png",
      mediaUrl:
        "https://storage.googleapis.com/abe_cloud_storage/image/large/5654006a-4f44-4b36-a07b-07417a8c88f3.png",
      smallUrl:
        "https://storage.googleapis.com/abe_cloud_storage/image/small/small_5654006a-4f44-4b36-a07b-07417a8c88f3.png",
      mediaType: "image",
    },
    events: [
      {
        id: 25,
        title: "Brussels Mile",
        description:
          "The First Ace Battle Mile competition in Europe. Top athletes are invited to run a mile together in the running battle.",
        category: "outdoor",
        startDateTime: "2023-09-23T16:00:00.000Z",
        endDate: "2023-09-23T20:00:00.000Z",
      },
    ],
    personalBest: {
      id: 21,
      resultInMs: 1207090,
    },
  },
  {
    id: 44,
    name: "Kyiv-Women",
    gender: "female",
    city: "Kyiv",
    totalPoints: 1448250,
    rank: 1,
    country: {
      id: 1,
      name: "Belgium",
      code: "BEL",
      flagIconUrl: "https://flagcdn.com/be.svg",
    },
    coach: {
      id: 16,
      name: "Vitaliy",
      surname: "Sabulyak",
    },
    players: [
      {
        id: 43,
        dateOfBirth: "2003-03-18 00:00:00.000",
        gender: "female",
        worldAthleticsUrl:
          "https://worldathletics.org/athletes/ukraine/tetiana-kohut-14848656",
        category: "professional",
        totalPoints: 296650,
        rank: 3,
      },
      {
        id: 44,
        dateOfBirth: "1999-12-02 00:00:00.000",
        gender: "female",
        worldAthleticsUrl:
          "https://worldathletics.org/athletes/ukraine/kseniya-pirozhenko-14576316",
        category: "professional",
        totalPoints: 322527,
        rank: 12,
      },
      {
        id: 45,
        dateOfBirth: "2003-10-02 00:00:00.000",
        gender: "female",
        worldAthleticsUrl:
          "https://worldathletics.org/athletes/ukraine/tetiana-chornovol-14894572",
        category: "professional",
        totalPoints: 295533,
        rank: 2,
      },
      {
        id: 46,
        dateOfBirth: "2004-09-02 00:00:00.000",
        gender: "female",
        worldAthleticsUrl:
          "https://worldathletics.org/athletes/ukraine/alina-korsunska-14929254",
        category: "professional",
        totalPoints: 298918,
        rank: 5,
      },
      {
        id: 47,
        dateOfBirth: "1999-12-10 00:00:00.000",
        gender: "female",
        worldAthleticsUrl:
          "https://worldathletics.org/athletes/ukraine/viktoriia-shkurko-14803067",
        category: "professional",
        totalPoints: 298280,
        rank: 4,
      },
      {
        id: 49,
        dateOfBirth: "2003-03-10 00:00:00.000",
        gender: "female",
        worldAthleticsUrl:
          "https://worldathletics.org/athletes/ukraine/anzhela-bondar-14848662",
        category: "professional",
        totalPoints: 307402,
        rank: 10,
      },
      {
        id: 76,
        dateOfBirth: "1996-10-24 00:00:00.000",
        gender: "female",
        worldAthleticsUrl:
          "https://worldathletics.org/athletes/ukraine/anna-zhmurko-14601796",
        category: "professional",
        totalPoints: 323613,
        rank: 13,
      },
      {
        id: 77,
        dateOfBirth: "2000-07-10 00:00:00.000",
        gender: "female",
        worldAthleticsUrl:
          "https://worldathletics.org/athletes/bulgaria/lilyana-georgieva-14645269",
        category: "professional",
        totalPoints: 292710,
        rank: 1,
      },
    ],
    logo: {
      id: 92,
      title: "kyiv_club.png",
      mediaUrl:
        "https://storage.googleapis.com/abe_cloud_storage/image/large/5654006a-4f44-4b36-a07b-07417a8c88f3.png",
      smallUrl:
        "https://storage.googleapis.com/abe_cloud_storage/image/small/small_5654006a-4f44-4b36-a07b-07417a8c88f3.png",
      mediaType: "image",
    },
    events: [
      {
        id: 25,
        title: "Brussels Mile",
        description:
          "The First Ace Battle Mile competition in Europe. Top athletes are invited to run a mile together in the running battle.",
        category: "outdoor",
        startDateTime: "2023-09-23T16:00:00.000Z",
        endDate: "2023-09-23T20:00:00.000Z",
      },
    ],
    personalBest: {
      id: 33,
      resultInMs: 1448250,
    },
  },
  {
    id: 45,
    name: "Brussels-Women",
    gender: "female",
    city: "Brussels",
    totalPoints: 1464580,
    rank: 2,
    country: {
      id: 1,
      name: "Belgium",
      code: "BEL",
      flagIconUrl: "https://flagcdn.com/be.svg",
    },
    coach: {
      id: 35,
      name: "Jan",
      surname: "Vindel",
    },
    players: [
      {
        id: 77,
        dateOfBirth: "2000-07-10 00:00:00.000",
        gender: "female",
        worldAthleticsUrl:
          "https://worldathletics.org/athletes/bulgaria/lilyana-georgieva-14645269",
        category: "professional",
        totalPoints: 292710,
        rank: 1,
      },
      {
        id: 92,
        dateOfBirth: "1999-11-10 00:00:00.000",
        gender: "female",
        worldAthleticsUrl:
          "https://worldathletics.org/athletes/poland/sylwana-gajda-14902261",
        category: "professional",
        totalPoints: 300512,
        rank: 6,
      },
      {
        id: 93,
        dateOfBirth: "2000-11-07 00:00:00.000",
        gender: "female",
        worldAthleticsUrl:
          "https://worldathletics.org/athletes/spain/valme-prado-14744289",
        category: "professional",
        totalPoints: 314475,
        rank: 11,
      },
      {
        id: 94,
        dateOfBirth: "2006-06-30 00:00:00.000",
        gender: "female",
        worldAthleticsUrl: null,
        category: "professional",
        totalPoints: 368391,
        rank: 14,
      },
      {
        id: 95,
        dateOfBirth: "2005-09-08 00:00:00.000",
        gender: "female",
        worldAthleticsUrl:
          "https://worldathletics.org/athletes/belgium/juliette-secretin-14961004",
        category: "professional",
        totalPoints: 304500,
        rank: 7,
      },
      {
        id: 96,
        dateOfBirth: "2001-11-27 00:00:00.000",
        gender: "female",
        worldAthleticsUrl:
          "https://worldathletics.org/athletes/ukraine/daryna-omarova-14879523",
        category: "professional",
        totalPoints: 306250,
        rank: 8,
      },
      {
        id: 97,
        dateOfBirth: "2002-08-17 00:00:00.000",
        gender: "female",
        worldAthleticsUrl:
          "https://worldathletics.org/athletes/portugal/camila-gomes-14849371",
        category: "professional",
        totalPoints: 307006,
        rank: 9,
      },
    ],
    logo: {
      id: 91,
      title: "brussels_club.png",
      mediaUrl:
        "https://storage.googleapis.com/abe_cloud_storage/image/large/d529f8ff-2c17-416b-addc-c847196b0cf2.png",
      smallUrl:
        "https://storage.googleapis.com/abe_cloud_storage/image/small/small_d529f8ff-2c17-416b-addc-c847196b0cf2.png",
      mediaType: "image",
    },
    events: [
      {
        id: 25,
        title: "Brussels Mile",
        description:
          "The First Ace Battle Mile competition in Europe. Top athletes are invited to run a mile together in the running battle.",
        category: "outdoor",
        startDateTime: "2023-09-23T16:00:00.000Z",
        endDate: "2023-09-23T20:00:00.000Z",
      },
    ],
    personalBest: {
      id: 34,
      resultInMs: 1464580,
    },
  },
];

export const newsPreviews = [
  {
    id: 19,
    title:
      "“We will be implementing shared ideas with World Athletics,” – founder of Ace Battle Mile, Iurii Pidnebesnyi",
    previewText:
      "The World Championship in Road Racing in Riga was a debut and a unique event not only for ...",
    smallImageUrl:
      "https://storage.googleapis.com/abe_cloud_storage/image/large/164771aa-74f2-4ef7-b850-cdac09482816.jpeg",
    createdAt: "2023-10-23T17:29:06.000Z",
    mainImage: null,
  },
  {
    id: 20,
    title:
      "Ukrainians achieved a historic victory in Brussels at Ace Battle Mile",
    previewText:
      "On September 23, in the capital of the European Union, Brussels, at the Sportpark De Drie ...",
    smallImageUrl:
      "https://storage.googleapis.com/abe_cloud_storage/image/large/585a2df4-3c02-4514-8b0e-515a4c95875f.jpeg",
    createdAt: "2023-09-30T19:33:29.000Z",
    mainImage: {
      id: 190,
      title: "img_7478-scaled.jpeg",
      mediaUrl:
        "https://storage.googleapis.com/abe_cloud_storage/image/large/585a2df4-3c02-4514-8b0e-515a4c95875f.jpeg",
      smallUrl:
        "https://storage.googleapis.com/abe_cloud_storage/image/small/small_585a2df4-3c02-4514-8b0e-515a4c95875f.jpeg",
      mediaType: "image",
    },
  },
  {
    id: 18,
    title:
      "Ksenia Pyrozhenko: I run and tell myself, “It’s hard for everyone – my boyfriend is at war, my parents are living in the occupied area – run for their sake!”",
    previewText:
      "<bt>Ksenia Pyrozhenko:</bt> <cite>I run and tell myself, “It’s hard for everyone – my boyf...",
    smallImageUrl:
      "https://storage.googleapis.com/abe_cloud_storage/image/large/e6b4b220-8a6b-4033-8f63-e6d9eee0c566.jpeg",
    createdAt: "2023-09-19T08:49:56.000Z",
    mainImage: {
      id: 147,
      title: "cover-news.jpeg",
      mediaUrl:
        "https://storage.googleapis.com/abe_cloud_storage/image/large/e6b4b220-8a6b-4033-8f63-e6d9eee0c566.jpeg",
      smallUrl:
        "https://storage.googleapis.com/abe_cloud_storage/image/small/small_e6b4b220-8a6b-4033-8f63-e6d9eee0c566.jpeg",
      mediaType: "image",
    },
  },
  {
    id: 17,
    title: "Clubs and everything you need to know",
    previewText:
      "The Organizing Committee of Battle Mile Indoor League 20/21 receives more and more questio...",
    smallImageUrl:
      "https://storage.googleapis.com/abe_cloud_storage/image/large/0bed7a34-2664-44f9-a256-7b19f4b5db88.png",
    createdAt: "2023-09-14T06:41:33.000Z",
    mainImage: {
      id: 109,
      title: "sunny-clubs.jpg",
      mediaUrl:
        "https://storage.googleapis.com/abe_cloud_storage/image/large/bd3d7643-8e6b-44b2-badf-0f32f98a4b11.jpg",
      smallUrl:
        "https://storage.googleapis.com/abe_cloud_storage/image/small/small_bd3d7643-8e6b-44b2-badf-0f32f98a4b11.jpg",
      mediaType: "image",
    },
  },
  {
    id: 16,
    title: "CREATING A NEW ATHLETICS HISTORY!",
    previewText:
      "Ukrainian Project ACE Battle Mile Returns to Conquer European Tracks!\nJust a few years ago...",
    smallImageUrl:
      "https://storage.googleapis.com/abe_cloud_storage/image/large/515620f5-bb18-4aac-b882-410f66942f69.png",
    createdAt: "2023-09-11T12:30:59.000Z",
    mainImage: {
      id: 107,
      title: "cover_bm_return_en.png",
      mediaUrl:
        "https://storage.googleapis.com/abe_cloud_storage/image/large/515620f5-bb18-4aac-b882-410f66942f69.png",
      smallUrl:
        "https://storage.googleapis.com/abe_cloud_storage/image/small/small_515620f5-bb18-4aac-b882-410f66942f69.png",
      mediaType: "image",
    },
  },
];

export const teamsPreview = [
  {
    id: 43,
    name: "Kyiv-Men",
    rank: 1,
    logo: {
      id: 92,
      title: "kyiv_club.png",
      mediaUrl:
        "https://storage.googleapis.com/abe_cloud_storage/image/large/5654006a-4f44-4b36-a07b-07417a8c88f3.png",
      smallUrl:
        "https://storage.googleapis.com/abe_cloud_storage/image/small/small_5654006a-4f44-4b36-a07b-07417a8c88f3.png",
      mediaType: "image",
    },
  },
  {
    id: 42,
    name: "Brussels-Men",
    rank: 2,
    logo: {
      id: 91,
      title: "brussels_club.png",
      mediaUrl:
        "https://storage.googleapis.com/abe_cloud_storage/image/large/d529f8ff-2c17-416b-addc-c847196b0cf2.png",
      smallUrl:
        "https://storage.googleapis.com/abe_cloud_storage/image/small/small_d529f8ff-2c17-416b-addc-c847196b0cf2.png",
      mediaType: "image",
    },
  },
  {
    id: 44,
    name: "Kyiv-Women",
    rank: 1,
    logo: {
      id: 92,
      title: "kyiv_club.png",
      mediaUrl:
        "https://storage.googleapis.com/abe_cloud_storage/image/large/5654006a-4f44-4b36-a07b-07417a8c88f3.png",
      smallUrl:
        "https://storage.googleapis.com/abe_cloud_storage/image/small/small_5654006a-4f44-4b36-a07b-07417a8c88f3.png",
      mediaType: "image",
    },
  },
  {
    id: 45,
    name: "Brussels-Women",
    rank: 2,
    logo: {
      id: 91,
      title: "brussels_club.png",
      mediaUrl:
        "https://storage.googleapis.com/abe_cloud_storage/image/large/d529f8ff-2c17-416b-addc-c847196b0cf2.png",
      smallUrl:
        "https://storage.googleapis.com/abe_cloud_storage/image/small/small_d529f8ff-2c17-416b-addc-c847196b0cf2.png",
      mediaType: "image",
    },
  },
];

export const events = [
  {
    id: 25,
    title: "Brussels Mile",
    description:
      "The First Ace Battle Mile competition in Europe. Top athletes are invited to run a mile together in the running battle.",
    category: "outdoor",
    startDateTime: "2023-09-23T16:00:00.000Z",
    endDate: "2023-09-23T20:00:00.000Z",
    introImage: {
      id: 90,
      title: "brussle-mile-photo.jpg",
      mediaUrl:
        "https://storage.googleapis.com/abe_cloud_storage/image/large/9314ea99-2cd2-4f86-b6ea-1cb63ef9c21f.jpg",
      smallUrl:
        "https://storage.googleapis.com/abe_cloud_storage/image/small/small_9314ea99-2cd2-4f86-b6ea-1cb63ef9c21f.jpg",
      mediaType: "image",
    },
    minorImage: {
      id: 178,
      title: "podium-brussels.JPG",
      mediaUrl:
        "https://storage.googleapis.com/abe_cloud_storage/image/large/c5ff9532-96a8-4d6a-957e-706e654e494f.JPG",
      smallUrl:
        "https://storage.googleapis.com/abe_cloud_storage/image/small/small_c5ff9532-96a8-4d6a-957e-706e654e494f.JPG",
      mediaType: "image",
    },
    location: {
      id: 32,
      address: "Sportpark De Drie Linden",
      zipCode: "1170",
      city: "Brussels",
      country: {
        id: 1,
        name: "Belgium",
        code: "BEL",
        flagIconUrl: "https://flagcdn.com/be.svg",
      },
    },
    teamsCount: 4,
    totalPrize: 6000,
  },
];

export const races: any[] = [
  {
    id: 12,
    startTime: "2023-09-23T17:00:00.000Z",
    name: "Men Team Brussels - Men Team Kyiv",
    type: "male",
    teams: teams.slice(0, 2),
    event: {
      id: 25,
      title: "Brussels Mile",
      description:
        "The First Ace Battle Mile competition in Europe. Top athletes are invited to run a mile together in the running battle.",
      category: "outdoor",
      startDateTime: "2023-09-23T16:00:00.000Z",
      endDate: "2023-09-23T20:00:00.000Z",
      location: {
        id: 32,
        address: "Sportpark De Drie Linden",
        zipCode: "1170",
        city: "Brussels",
        country: {
          id: 1,
          name: "Belgium",
          code: "BEL",
          flagIconUrl: "https://flagcdn.com/be.svg",
        },
      },
    },
    winner: {
      id: 43,
      name: "Kyiv-Men",
      gender: "male",
      city: "Kyiv",
      totalPoints: 1220000,
      rank: 1,
    },
    teamResults: [
      {
        id: 21,
        resultInMs: 1207090,
        team: {
          id: 43,
          name: "Kyiv-Men",
          gender: "male",
          city: "Kyiv",
          totalPoints: 1220000,
          rank: 1,
        },
      },
      {
        id: 22,
        resultInMs: 1251300,
        team: {
          id: 42,
          name: "Brussels-Men",
          gender: "male",
          city: "Brussels",
          totalPoints: 1255365,
          rank: 2,
        },
      },
    ],
  },
  {
    id: 23,
    startTime: "2023-09-23T18:00:00.000Z",
    name: "Women final: Team Brussels - Team Kyiv",
    type: "female",
    event: {
      id: 25,
      title: "Brussels Mile",
      description:
        "The First Ace Battle Mile competition in Europe. Top athletes are invited to run a mile together in the running battle.",
      category: "outdoor",
      startDateTime: "2023-09-23T16:00:00.000Z",
      endDate: "2023-09-23T20:00:00.000Z",
      location: {
        id: 32,
        address: "Sportpark De Drie Linden",
        zipCode: "1170",
        city: "Brussels",
        country: {
          id: 1,
          name: "Belgium",
          code: "BEL",
          flagIconUrl: "https://flagcdn.com/be.svg",
        },
      },
    },
    winner: {
      id: 44,
      name: "Kyiv-Women",
      gender: "female",
      city: "Kyiv",
      totalPoints: 1448250,
      rank: 1,
    },
    teams: teams.slice(2),
    teamResults: [
      {
        id: 33,
        resultInMs: 1448250,
        team: {
          id: 44,
          name: "Kyiv-Women",
          gender: "female",
          city: "Kyiv",
          totalPoints: 1448250,
          rank: 1,
        },
      },
      {
        id: 34,
        resultInMs: 1464580,
        team: {
          id: 45,
          name: "Brussels-Women",
          gender: "female",
          city: "Brussels",
          totalPoints: 1464580,
          rank: 2,
        },
      },
    ],
  },
  {
    id: 24,
    startTime: "2023-09-23T19:00:00.000Z",
    name: "Men Final",
    type: "male",
    teams: teams.slice(0, 2),
    event: {
      id: 25,
      title: "Brussels Mile",
      description:
        "The First Ace Battle Mile competition in Europe. Top athletes are invited to run a mile together in the running battle.",
      category: "outdoor",
      startDateTime: "2023-09-23T16:00:00.000Z",
      endDate: "2023-09-23T20:00:00.000Z",
      location: {
        id: 32,
        address: "Sportpark De Drie Linden",
        zipCode: "1170",
        city: "Brussels",
        country: {
          id: 1,
          name: "Belgium",
          code: "BEL",
          flagIconUrl: "https://flagcdn.com/be.svg",
        },
      },
    },
    winner: {
      id: 43,
      name: "Kyiv-Men",
      gender: "male",
      city: "Kyiv",
      totalPoints: 1220000,
      rank: 1,
    },
    teamResults: [
      {
        id: 35,
        resultInMs: 1237920,
        team: {
          id: 43,
          name: "Kyiv-Men",
          gender: "male",
          city: "Kyiv",
          totalPoints: 1220000,
          rank: 1,
        },
      },
      {
        id: 36,
        resultInMs: 1272810,
        team: {
          id: 42,
          name: "Brussels-Men",
          gender: "male",
          city: "Brussels",
          totalPoints: 1255365,
          rank: 2,
        },
      },
    ],
  },
];

export const testUserRunner = {
  id: 12,
  name: "Andriy",
  surname: "Krakovetskyy",
  email: "ak@gmail.com",
  role: "runner",
  interest: null,
  verified: false,
  city: "Vinitsya",
  password: "$2b$10$FkiiUcWlqaqsrG6SaBP9mOW70fuNjPlurv9tferYkkyXP76xWw93G",
  createdAt: "2023-08-18T08:30:59.750Z",
  updatedAt: "2023-10-01T10:07:40.000Z",
  acceptTerms: false,
  acceptNews: false,
  image: {
    id: 112,
    title: "krakoveczkij-scaled.jpg",
    mediaUrl:
      "https://storage.googleapis.com/abe_cloud_storage/image/large/ae1925bf-61cc-48cf-9461-aa733160e0d7.jpg",
    smallUrl:
      "https://storage.googleapis.com/abe_cloud_storage/image/small/small_ae1925bf-61cc-48cf-9461-aa733160e0d7.jpg",
    mediaType: "image",
  },
  country: {
    id: 3,
    name: "Ukraine",
    code: "UKR",
    flagIconUrl: "https://flagcdn.com/ua.svg",
  },
  runner: {
    id: 12,
    dateOfBirth: "2000-01-01 00:00:00.000",
    gender: "male",
    worldAthleticsUrl:
      "https://worldathletics.org/athletes/ukraine/andriy-krakovetskyy-14779410",
    category: "professional",
    totalPoints: 260381,
    rank: 9,
    personalBests: [
      {
        id: 122,
        distance: 160934,
        finalResultInMs: 251010,
        runnerType: null,
      },
    ],
    results: [
      {
        id: 122,
        distance: 160934,
        finalResultInMs: 251010,
        runnerType: null,
      },
      {
        id: 172,
        distance: 160934,
        finalResultInMs: 254650,
        runnerType: null,
      },
    ],
    club: {
      id: 16,
      name: "Kyiv BM",
      city: "Kyiv",
      createdAt: "2023-08-01T19:43:25.897Z",
      updatedAt: "2023-09-14T08:18:49.673Z",
    },
    user: {
      id: 12,
      name: "Andriy",
      surname: "Krakovetskyy",
      email: "ak@gmail.com",
      role: "runner",
      interest: null,
      verified: false,
      city: "Vinitsya",
      password: "$2b$10$FkiiUcWlqaqsrG6SaBP9mOW70fuNjPlurv9tferYkkyXP76xWw93G",
      createdAt: "2023-08-18T08:30:59.750Z",
      updatedAt: "2023-10-01T10:07:40.000Z",
      acceptTerms: false,
      acceptNews: false,
    },
  },
  manager: null,
  spectator: null,
};

export const textUserManager = {
  id: 1,
  name: "Oleksii",
  surname: "Pidnebesnyi",
  email: "apodnes@gmail.com",
  role: "manager",
  interest: null,
  verified: false,
  city: "Brussels",
  password: "$2b$10$vX2gmX4eBD5I1ud4mekM2.wKqSxV0LDdqra2Mq0cvvSdFksDXTJyS",
  createdAt: "2023-06-24T10:03:33.765Z",
  updatedAt: "2023-10-21T09:05:43.000Z",
  acceptTerms: false,
  acceptNews: false,
  image: {
    id: 185,
    title: "charleroi.jpg",
    mediaUrl:
      "https://storage.googleapis.com/abe_cloud_storage/image/large/838b618e-a0d5-47c8-a22e-a88d0e9662bb.jpg",
    smallUrl:
      "https://storage.googleapis.com/abe_cloud_storage/image/small/small_838b618e-a0d5-47c8-a22e-a88d0e9662bb.jpg",
    mediaType: "image",
  },
  country: {
    id: 1,
    name: "Belgium",
    code: "BEL",
    flagIconUrl: "https://flagcdn.com/be.svg",
  },
  runner: null,
  manager: {
    id: 1,
    phone: "+32476032419",
    club: {
      id: 16,
      name: "Kyiv BM",
      city: "Kyiv",
      createdAt: "2023-08-01T19:43:25.897Z",
      updatedAt: "2023-09-14T08:18:49.673Z",
    },
    user: {
      id: 1,
      name: "Oleksii",
      surname: "Pidnebesnyi",
      email: "apodnes@gmail.com",
      role: "manager",
      interest: null,
      verified: false,
      city: "Brussels",
      password: "$2b$10$vX2gmX4eBD5I1ud4mekM2.wKqSxV0LDdqra2Mq0cvvSdFksDXTJyS",
      createdAt: "2023-06-24T10:03:33.765Z",
      updatedAt: "2023-10-21T09:05:43.000Z",
      acceptTerms: false,
      acceptNews: false,
    },
  },
  spectator: null,
};

export const testUserSpectator = {
  id: 104,
  name: "Iurii ",
  surname: "Pidnebesnyi ",
  email: "podnes@gmail.com",
  role: "spectator",
  interest: "Fan",
  verified: true,
  city: "Brussels ",
  password: "$2b$10$YYok4dOFFBYrZmEhscb1ie9UfrCNHC3iI1h.jVMK9u3QM5kUhATvy",
  createdAt: "2023-10-25T20:23:32.450Z",
  updatedAt: "2023-10-25T20:24:35.000Z",
  acceptTerms: false,
  acceptNews: false,
  image: {
    id: 194,
    title: "20231024_105821.jpg",
    mediaUrl:
      "https://storage.googleapis.com/abe_cloud_storage/image/large/2965f17d-ee67-4d70-a8b7-3938c0c7c834.jpg",
    smallUrl:
      "https://storage.googleapis.com/abe_cloud_storage/image/small/small_2965f17d-ee67-4d70-a8b7-3938c0c7c834.jpg",
    mediaType: "image",
  },
  country: {
    id: 1,
    name: "Belgium",
    code: "BEL",
    flagIconUrl: "https://flagcdn.com/be.svg",
  },
  runner: null,
  manager: null,
  spectator: {
    id: 106,
    ageRange: ">45",
    favoriteClubs: [],
    user: {
      id: 104,
      name: "Iurii ",
      surname: "Pidnebesnyi ",
      email: "podnes@gmail.com",
      role: "spectator",
      interest: "Fan",
      verified: true,
      city: "Brussels ",
      password: "$2b$10$YYok4dOFFBYrZmEhscb1ie9UfrCNHC3iI1h.jVMK9u3QM5kUhATvy",
      createdAt: "2023-10-25T20:23:32.450Z",
      updatedAt: "2023-10-25T20:24:35.000Z",
      acceptTerms: false,
      acceptNews: false,
    },
  },
};

export const coaches = [
  {
    id: 1,
    name: "Oleksii",
    surname: "Kulivets",
  },
  {
    id: 2,
    name: "Vitaliy",
    surname: "Sabulyak",
  },
  {
    id: 3,
    name: "Jan",
    surname: "Vindel",
  },
];

export const notifications: any[] = [
  {
    id: 1,
    sender: managers[0],
    createdAt: "2023-10-25T20:23:32.450Z",
    text: "Hello, I am Oleksii, the founder of Ace Battle Mile. I am happy to see you here!",
    title: "Welcome to Ace Battle Mile!",
  },
  {
    id: 2,
    sender: managers[1],
    createdAt: "2023-10-10T20:23:32.450Z",
    text: "Welcome to Ace Battle Mile! You can find all the information about the upcoming events here.",
    title: "Welcome to Ace Battle Mile!",
  },
  {
    id: 3,
    sender: managers[0],
    createdAt: "2023-10-19T20:23:32.450Z",
    text: "Hello, I am Oleksii, the founder of Ace Battle Mile. I am happy to see you here!",
    title: "Welcome to Ace Battle Mile!",
  },
];

export const eventPodium = {
  eventTitle: "Brussels Mile",
  introImage: {
    id: 90,
    title: "brussle-mile-photo.jpg",
    mediaUrl:
      "https://storage.googleapis.com/abe_cloud_storage/image/large/9314ea99-2cd2-4f86-b6ea-1cb63ef9c21f.jpg",
    smallUrl:
      "https://storage.googleapis.com/abe_cloud_storage/image/small/small_9314ea99-2cd2-4f86-b6ea-1cb63ef9c21f.jpg",
    mediaType: "image",
  },
  podium: {
    male: {
      "1": {
        team: {
          id: 43,
          name: "Kyiv-Men",
          gender: "male",
          city: "Kyiv",
          totalPoints: 1220000,
          rank: 1,
          logo: {
            id: 92,
            title: "kyiv_club.png",
            mediaUrl:
              "https://storage.googleapis.com/abe_cloud_storage/image/large/5654006a-4f44-4b36-a07b-07417a8c88f3.png",
            smallUrl:
              "https://storage.googleapis.com/abe_cloud_storage/image/small/small_5654006a-4f44-4b36-a07b-07417a8c88f3.png",
            mediaType: "image",
          },
        },
        resultInMs: 2445010,
      },
      "2": {
        team: {
          id: 42,
          name: "Brussels-Men",
          gender: "male",
          city: "Brussels",
          totalPoints: 1255365,
          rank: 2,
          logo: {
            id: 91,
            title: "brussels_club.png",
            mediaUrl:
              "https://storage.googleapis.com/abe_cloud_storage/image/large/d529f8ff-2c17-416b-addc-c847196b0cf2.png",
            smallUrl:
              "https://storage.googleapis.com/abe_cloud_storage/image/small/small_d529f8ff-2c17-416b-addc-c847196b0cf2.png",
            mediaType: "image",
          },
        },
        resultInMs: 2524110,
      },
      "3": null,
    },
    female: {
      "1": {
        team: {
          id: 44,
          name: "Kyiv-Women",
          gender: "female",
          city: "Kyiv",
          totalPoints: 1448250,
          rank: 1,
          logo: {
            id: 92,
            title: "kyiv_club.png",
            mediaUrl:
              "https://storage.googleapis.com/abe_cloud_storage/image/large/5654006a-4f44-4b36-a07b-07417a8c88f3.png",
            smallUrl:
              "https://storage.googleapis.com/abe_cloud_storage/image/small/small_5654006a-4f44-4b36-a07b-07417a8c88f3.png",
            mediaType: "image",
          },
        },
        resultInMs: 1448250,
      },
      "2": {
        team: {
          id: 45,
          name: "Brussels-Women",
          gender: "female",
          city: "Brussels",
          totalPoints: 1464580,
          rank: 2,
          logo: {
            id: 91,
            title: "brussels_club.png",
            mediaUrl:
              "https://storage.googleapis.com/abe_cloud_storage/image/large/d529f8ff-2c17-416b-addc-c847196b0cf2.png",
            smallUrl:
              "https://storage.googleapis.com/abe_cloud_storage/image/small/small_d529f8ff-2c17-416b-addc-c847196b0cf2.png",
            mediaType: "image",
          },
        },
        resultInMs: 1464580,
      },
      "3": null,
    },
  },
  bestSportsmen: {
    male: {
      id: 120,
      distance: 160934,
      finalResultInMs: 248360,
      runnerType: null,
      runner: {
        id: 10,
        dateOfBirth: "2001-01-17 00:00:00.000",
        gender: "male",
        worldAthleticsUrl:
          "https://worldathletics.org/athletes/ukraine/dmytrii-nikolaichuk-14596852",
        category: "professional",
        totalPoints: 252520,
        rank: 2,
        user: {
          id: 10,
          name: "Dmytriy",
          surname: "Nikolaychuk",
          email: "dn@gmail.com",
          role: "runner",
          interest: null,
          verified: false,
          city: "Kyiv",
          password:
            "$2b$10$vgZ65ufuNtmb3orscAM11OeI05itNUffR2AkE1xqTzAJ7rkdcGoPy",
          createdAt: "2023-08-18T08:29:02.528Z",
          updatedAt: "2023-10-01T10:07:40.000Z",
          acceptTerms: false,
          acceptNews: false,
          image: {
            id: 113,
            title: "nikolajchuk-dmitrij.jpg",
            mediaUrl:
              "https://storage.googleapis.com/abe_cloud_storage/image/large/56ff5950-ba01-483b-98e2-cfd12a5bc82e.jpg",
            smallUrl:
              "https://storage.googleapis.com/abe_cloud_storage/image/small/small_56ff5950-ba01-483b-98e2-cfd12a5bc82e.jpg",
            mediaType: "image",
          },
        },
      },
    },
    female: {
      id: 165,
      distance: 160934,
      finalResultInMs: 292710,
      runnerType: null,
      runner: {
        id: 77,
        dateOfBirth: "2000-07-10 00:00:00.000",
        gender: "female",
        worldAthleticsUrl:
          "https://worldathletics.org/athletes/bulgaria/lilyana-georgieva-14645269",
        category: "professional",
        totalPoints: 292710,
        rank: 1,
        user: {
          id: 77,
          name: "Lilyana",
          surname: "Georgieva",
          email: "georgieva@gmail.com",
          role: "runner",
          interest: null,
          verified: false,
          city: "Sophia",
          password:
            "$2b$10$KLp/Uey6.bQo2y0TE2qgPOnssPniw0ldXU0Z9h7GhO4b817D.F8Ge",
          createdAt: "2023-09-14T08:00:43.803Z",
          updatedAt: "2023-10-01T09:51:24.000Z",
          acceptTerms: false,
          acceptNews: false,
          image: {
            id: 175,
            title: "lilyana.jpg",
            mediaUrl:
              "https://storage.googleapis.com/abe_cloud_storage/image/large/35b6fc63-a3d0-4a01-9896-ed863a78f1c8.jpg",
            smallUrl:
              "https://storage.googleapis.com/abe_cloud_storage/image/small/small_35b6fc63-a3d0-4a01-9896-ed863a78f1c8.jpg",
            mediaType: "image",
          },
        },
      },
    },
  },
  bestJokerPair: {
    male: {
      runners: [
        {
          id: 119,
          distance: 80934,
          finalResultInMs: 229040,
          runnerType: "joker-2",
          runner: {
            id: 88,
            dateOfBirth: "2002-03-09 00:00:00.000",
            gender: "male",
            worldAthleticsUrl:
              "https://worldathletics.org/athletes/netherlands/jurgen-wielart-14429680",
            category: "professional",
            totalPoints: 263828,
            rank: 12,
            user: {
              id: 88,
              name: "Ivan",
              surname: "Ivanov",
              email: "ivanov@gmail.com",
              role: "runner",
              interest: null,
              verified: false,
              city: "Sophia",
              password:
                "$2b$10$PQuO5rZGSFEzsfVZEmXhx.PpaLbk.KjxFehivuJ/qE2KYI1CXRTz6",
              createdAt: "2023-09-26T11:15:09.138Z",
              updatedAt: "2023-10-01T09:29:59.000Z",
              acceptTerms: false,
              acceptNews: false,
              image: null,
            },
          },
        },
        {
          id: 123,
          distance: 70934,
          finalResultInMs: null,
          runnerType: "pacer-2",
          runner: {
            id: 11,
            dateOfBirth: "1996-07-02 00:00:00.000",
            gender: "male",
            worldAthleticsUrl: "",
            category: "professional",
            totalPoints: 256975,
            rank: 5,
            user: {
              id: 11,
              name: "Yevhen",
              surname: "Kuznetsov",
              email: "yk@gmailc.com",
              role: "runner",
              interest: null,
              verified: false,
              city: "Dripto",
              password:
                "$2b$10$Iivj6oDlBPVuycg0rfJkHeRubyj/v1oM3/wKQwB4yuiNYdOZ4ARFS",
              createdAt: "2023-08-18T08:30:07.273Z",
              updatedAt: "2023-10-01T10:07:43.000Z",
              acceptTerms: false,
              acceptNews: false,
              image: null,
            },
          },
        },
      ],
      finalResultInMs: 229040,
    },
    female: {
      runners: [
        {
          id: 156,
          distance: 80934,
          finalResultInMs: 270670,
          runnerType: "joker-1",
          runner: {
            id: 49,
            dateOfBirth: "2003-03-10 00:00:00.000",
            gender: "female",
            worldAthleticsUrl:
              "https://worldathletics.org/athletes/ukraine/anzhela-bondar-14848662",
            category: "professional",
            totalPoints: 307402,
            rank: 10,
            user: {
              id: 49,
              name: "Anzhelika",
              surname: "BONDAR",
              email: "bond@gmail.com",
              role: "runner",
              interest: null,
              verified: false,
              city: "Kyiv",
              password:
                "$2b$10$9g0F..sngUb1dHGU9pB5QO6mHtDLkodjIdEqRGITV0ko6sEYPriGy",
              createdAt: "2023-08-20T08:54:11.799Z",
              updatedAt: "2023-10-01T09:53:41.767Z",
              acceptTerms: false,
              acceptNews: false,
              image: {
                id: 117,
                title: "bondar-angelina.jpg",
                mediaUrl:
                  "https://storage.googleapis.com/abe_cloud_storage/image/large/d2f3cfd2-4549-4323-b33b-421d81cb2d34.jpg",
                smallUrl:
                  "https://storage.googleapis.com/abe_cloud_storage/image/small/small_d2f3cfd2-4549-4323-b33b-421d81cb2d34.jpg",
                mediaType: "image",
              },
            },
          },
        },
        {
          id: 161,
          distance: 70934,
          finalResultInMs: null,
          runnerType: "pacer-1",
          runner: {
            id: 46,
            dateOfBirth: "2004-09-02 00:00:00.000",
            gender: "female",
            worldAthleticsUrl:
              "https://worldathletics.org/athletes/ukraine/alina-korsunska-14929254",
            category: "professional",
            totalPoints: 298918,
            rank: 5,
            user: {
              id: 46,
              name: "Alina",
              surname: "KORSUNSKA",
              email: "kors@gmail.com",
              role: "runner",
              interest: null,
              verified: false,
              city: "Kyiv",
              password:
                "$2b$10$L75vOycFTNO3ZK8FKLyAJ.0M4zH/J2KS24/0PtO2P2/s4GqcoyMv6",
              createdAt: "2023-08-20T08:51:55.416Z",
              updatedAt: "2023-10-01T09:51:34.000Z",
              acceptTerms: false,
              acceptNews: false,
              image: null,
            },
          },
        },
      ],
      finalResultInMs: 270670,
    },
  },
  racesByType: {
    male: [
      {
        id: 12,
        name: "Men Team Brussels - Men Team Kyiv",
        startTime: "2023-09-23T17:00:00.000Z",
      },
      {
        id: 24,
        name: "Men Final",
        startTime: "2023-09-23T19:00:00.000Z",
      },
    ],
    female: [
      {
        id: 23,
        name: "Women final: Team Brussels - Team Kyiv",
        startTime: "2023-09-23T18:00:00.000Z",
      },
    ],
  },
};
