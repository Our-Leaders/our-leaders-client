export const educationalBackground = [{
  degree: 'BAC',
  institution: 'University of Lagos',
  startDate: '10/12/1980',
}];

export const feedsMock = [{
  id: 'r0arI6Jd2',
  feedUrl: 'https://www.tostvnetwork.com/coronavirus-sanwo-olu-lifts-ban-on-event-centres/',
  publishedAt: '2020-06-10T00:00:00.000Z',
  summary: 'The ban imposed on event centres in the Hospitality and Tourism industry by the Lagos state governor, Mr Babajide Sanwo-Olu, due to the spread...',
  title: 'Coronavirus: Sanwo-Olu Lifts Ban on Event Centres',
}, {
  feedUrl: 'https://www.tostvnetwork.com/coronavirus-lagos-discharges-15-covid-19-patients/',
  id: 'wNw4ximAB9',
  publishedAt: '2020-05-17T00:00:00.000Z',
  summary: 'Fifteen more COVID-19 patients have been discharged from the Lagos State isolation centres after testing negative for the virus twice.Lagos State Governor, Babajide Sanwo-Olu,...',
  title: 'Coronavirus: Lagos discharges 15 COVID-19 patients',
}, {
  feedUrl: 'https://www.tostvnetwork.com/coronavirus-28-covid-19-patients-discharged-in-lagos-abuja/',
  id: 'ZsRl8DZBB6',
  publishedAt: '2020-05-10T00:00:00.000Z',
  summary: 'Twenty-eight patients who were treated for COVID-19 in Lagos and Abuja have recovered.Babajide Sanwo-Olu, governor of Lagos, and Mohammed Bello, minister of the federal...',
  title: 'Coronavirus: 28 COVID-19 patients discharged in Lagos, Abuja',
}, {
  feedUrl: 'https://www.tostvnetwork.com/sanwo-olu-blames-late-airport-border-closure-for-covid-19-spread/',
  id: 'PJnxrT9AGS',
  publishedAt: '2020-04-30T00:00:00.000Z',
  summary: 'Lagos State Governor, Babajide Sanwo-Olu, has said the delayed closure of the country’s borders, seaport, and airports, including the failure of returnees to self-isolate,...',
  title: 'Sanwo-Olu blames late airport, border closure for COVID-19 spread',
}, {
  feedUrl: 'https://www.tostvnetwork.com/covid-19-lagos-governor-sanwo-olu-announces-discharge-of-five-patients/',
  id: 'Bx7KmoNcEF',
  publishedAt: '2020-04-16T00:00:00.000Z',
  summary: 'Governor Babajide Sanwo-Olu of Lagos State has announced the discharge of five COVID-19 patients from the Mainland Infectious Diseases Hospital.In a series of tweets...',
  title: 'COVID-19: Lagos Governor, Sanwo-Olu announces discharge of Five Patients',
}];

export const politicalBackground = [{
  position: 'president',
  region: 'the republic of Nigeria',
  inOffice: true,
  state: 'all',
  startDate: '10/12/1980',
  endDate: '10/12/1986',
}];

export const professionalBackground = [{
  title: 'minister',
  description: 'minister of oil',
  startDate: '10/12/1990',
  endDate: '10/12/1994',
}];

export const socials = {
  facebook: 'buhari',
  instagram: '@buhari',
  twitter: '@MBuhari',
};

export const socialsPoliticalParty = {
  facebook: 'pdp',
  instagram: '@pdp',
  twitter: '@pdp',
};

export const accomplishments = [{
  title: 'Abuja Subway Station',
  description: 'Something was built by him in a way that was not expected.',
  date: '10/12/2020',
  quarter: 'q1',
  tags: ['built', 'transportation'],
  createdOn: '10/12/2020',
}, {
  title: 'Minimum Wage Increase',
  description: 'Something was built by him in a way that was not expected.',
  date: '10/2/2018',
  quarter: 'q2',
  tags: ['built', 'finance'],
  createdOn: '10/12/2019',
}, {
  title: 'Lagos Railway',
  description: 'Something was built by him in a way that was not expected.',
  date: '10/07/2019',
  quarter: 'q3',
  image: {},
  tags: ['built', 'transportation'],
  createdOn: '10/12/2019',
}, {
  title: 'Built Something',
  description: 'Something was built by him in a way that was not expected.',
  date: '10/07/2019',
  quarter: 'q1',
  tags: ['built', 'something'],
  createdOn: '10/12/2019',
}, {
  title: 'Lagos Railway',
  description: 'Something was built by him in a way that was not expected.',
  date: '10/12/2020',
  quarter: 'q1',
  tags: ['built', 'transport'],
  createdOn: '10/12/2019',
}, {
  title: 'Introduced E-Cards for Tolls',
  description: 'Something was built by him in a way that was not expected.',
  date: '10/12/2020',
  quarter: 'q1',
  tags: ['built', 'technology', 'transportation'],
  createdOn: '10/12/2019',
}];

export const politicalPartiesMock = [{
  id: 'PP1',
  name: 'People\'s Democratic Party',
  acronym: 'PDP',
  logo: 'https://res.cloudinary.com/saintlawal/image/upload/v1575589072/coupin/pdp_sm4m1i.png',
  ideology: 'We believe in the power of the umbrela.',
  socials: socialsPoliticalParty,
  partyBackground: 'We started from the bottom, now we\'re here!',
  partyDescription: 'A body of individuals with individual thoughts.',
  createdAt: '10/10/2001',
  vote: {
    up: 12358,
    down: 4367,
  },
}, {
  id: 'PP2',
  name: 'All Progressive Congress',
  acronym: 'PDP',
  logo: 'https://res.cloudinary.com/saintlawal/image/upload/v1575589072/coupin/apc_uegfl9.png',
  ideology: 'We believe in the power of the broom.',
  socials: socialsPoliticalParty,
  partyBackground: 'We started from the bottom, now we\'re here!',
  partyDescription: 'A body of individuals with collective thoughts.',
  createdAt: '10/10/2005',
  vote: {
    up: 17358,
    down: 9067,
  },
}];


export const politiciansMock = [{
  id: 'P1',
  name: 'Muhammadu Buhari',
  dob: '12/12/1964',
  religion: 'muslim',
  manifesto: {
    summary: '<h2>Testing</h2><p>I was once a manifesto...now! I am just..a man.</p>',
    url: 'http://www.example.com',
  },
  stateOfOrigin: 'Oyo',
  politicalParty: politicalPartiesMock[0],
  profileImage: 'https://res.cloudinary.com/saintlawal/image/upload/v1575589072/coupin/buhari_xe8iet.png',
  status: 'current',
  vote: {
    up: 358,
    down: 67,
  },
  educationalBackground,
  politicalBackground,
  professionalBackground,
  socials,
  accomplishments,
}, {
  id: 'P2',
  name: 'Yemi Osigbanjo',
  dob: '12/12/1978',
  religion: 'christian',
  manifesto: {
    summary: '<h2>Testing</h2> <p>I was once a manifesto...now! I am just..a man.</p>',
    url: 'http://www.example.com',
  },
  stateOfOrigin: 'Osun',
  politicalParty: politicalPartiesMock[1],
  profileImage: 'https://res.cloudinary.com/saintlawal/image/upload/v1575589072/coupin/osibanjo_hzaxej.png',
  status: 'current',
  vote: {
    up: 1358,
    down: 367,
  },
  educationalBackground,
  politicalBackground,
  professionalBackground,
  socials,
  accomplishments,
}, {
  id: '4uyi43',
  name: 'Muhammadu Buhari',
  dob: '1942-12-17T19:27:00.000Z',
  country: 'NG',
  manifesto: {
    summary: '<h1>Hi There</h1><p>We are making <strong>BIG </strong>changes. So keep watching this space. Thank you.</p><p></p><ul><li><p>Watch</p></li><li><p>Look</p></li><li><p>See</p></li></ul>',
    url: 'http://www.example.com/watching?use=38ru3ku',
  },
  stateOfOrigin: 'Katsina',
  politicalParty: {
    logo: {
      publicId: 'development/005e97c5efc381baefcd342c1c20ca09_sibyek',
      url: 'http://res.cloudinary.com/saintlawal/image/upload/v1587757319/development/005e97c5efc381baefcd342c1c20ca09_sibyek.png',
    },
    socials: {
      facebook: 'https://www.facebook.com/APCNigeria/',
      twitter: 'https://twitter.com/OfficialAPCNg',
      instagram: 'https://www.instagram.com/officialapcng',
    },
    partyDescription: {
      founded: 1980,
      partyChairman: 'Adams Oshiomole',
    },
    votes: {
      down: [],
      up: [],
    },
    country: 'NG',
    _id: 'CsBkJ1aoI',
    name: 'All Progressives Congress',
    acronym: 'APC',
    partyBackground: 'The All Progressives Congress is a political party in Nigeria, formed on 6 February 2013 in anticipation of the 2015 elections. APC candidate Muhammadu Buhari won the presidential election by almost 2.6 million votes. Incumbent President Goodluck Jonathan conceded defeat on 31 March.',
    createdAt: '2020-04-24T19:42:00.032Z',
    updatedAt: '2020-04-24T19:42:00.032Z',
    __v: 0,
  },
  profileImage: 'http://res.cloudinary.com/saintlawal/image/upload/v1587756615/development/26c7d594a525366922b25e549a367e56_rgv59q.png',
  status: 'current',
  vote: {
    down: 0,
    up: 0,
  },
  voters: [],
  educationalBackground: [
    {
      degree: 'Bachelors',
      institution: 'University of Ilorin',
      graduationYear: null,
      _id: 'wIoP3V5Qu',
    },
  ],
  politicalBackground: [
    {
      inOffice: true,
      position: 'President',
      description: 'Head of State',
      region: 'Federal Republic of Nigeria',
      startDate: '2016-03-16T20:09:00.000Z',
      endDate: '2020-04-23T20:09:00.000Z',
      _id: 'ehbBMElkC',
    },
  ],
  professionalBackground: [
    {
      title: 'Minister',
      description: 'Minister of Oil',
      startYear: 1974,
      endYear: 1980,
      _id: '4312iUvTji',
    },
  ],
  socials: {
    facebook: 'https://www.facebook.com/MuhammaduBuhari/',
    twitter: 'https://twitter.com/MBuhari',
    instagram: 'https://www.instagram.com/muhammadubuhari',
  },
  accomplishments: [
    {
      image: {
        publicId: 'development/68e0c9fb3c4e45f8c15f4ee732674680_cxd7gs',
        url: 'http://res.cloudinary.com/saintlawal/image/upload/v1587759753/development/68e0c9fb3c4e45f8c15f4ee732674680_cxd7gs.jpg',
      },
      tags: [
        'technology',
      ],
      createdOn: '2020-04-24T17:38:45.129Z',
      title: 'Inter-State Rail; Rail from Lagos - Benin',
      description: 'Created a rail way from lagos to benin.',
      date: '2015-08-01T19:42:00.000Z',
      quarter: 'q3',
      url: '',
      _id: 'FvGsx3Gy7',
    },
  ],
  numberOfViews: 82,
}];
