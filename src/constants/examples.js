export const educationalBackground = [{
  degree: 'BAC',
  institution: 'University of Lagos',
  startDate: '10/12/1980',
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
}];
