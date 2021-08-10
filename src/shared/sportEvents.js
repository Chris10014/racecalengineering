export const SPORTEVENTS = [
  {
    name: "Ladenburger Triathlonfestival",
    host: "TV Ladenburg",
    logo: "",
    website: "https://roemerman.de/",
    start: "17.07.2021",
    end: "19.07.2021",
    city: "Ladenburg",
    postalCode: "68526",
    countryCode: "DE",
    races: [
      {
        name: "Fitnesstriathlon",
        sport: "Triathlon",
        endurance: "Sprint distance",
        start: "17.07.2012",
        competition: true,
        courses: [
          {
            type: "swim",
            distance: "0,5",
          },
          {
            type: "TT",
            distance: "20",
          },
          {
            type: "run",
            distance: "5",
          },
        ],
      },
      {
        name: "Römerman",
        sport: "Triathlon",
        endurance: "Short distance",
        start: "17.07.2012",
        competition: true,
        courses: [
          {
            type: "swim",
            distance: "1,8",
          },
          {
            type: "TT",
            distance: "42",
          },
          {
            type: "run",
            distance: "10",
          },
        ],
      },
    ],
  },

  {
    name: "Staufen Bike",
    host: "RSV Hattersheim",
    logo: "image src",
    website: "#",
    start: "30.03.2021",
    end: "",
    city: "Hattersheim",
    postalCode: "65000",
    countryCode: "CH",
    races: [
      {
        name: "Staufen Bike kurz",
        sport: "bike",
        endurance: "",
        start: "30.03.2021",
        competition: false,
        courses: [
          {
            type: "MTB",
            distance: "20",
          },
        ],
      },
      {
        name: "Staufen Bike mittel",
        sport: "bike",
        endurance: "",
        start: "30.03.2021",
        competition: false,
        courses: [
          {
            type: "MTB",
            distance: "40",
          },
        ],
      },
      {
        name: "Staufen Bike lang",
        sport: "bike",
        endurance: "",
        start: "30.03.2021",
        competition: false,
        courses: [
          {
            type: "MTB",
            distance: "60",
          },
        ],
      },
    ],
  },
];
