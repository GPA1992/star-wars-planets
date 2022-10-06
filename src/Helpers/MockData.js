const mockData = {
  count: 60,
  next: 'https://swapi-trybe.herokuapp.com/api/planets/?page=2',
  previous: null,
  results: [
    {
      name: 'Endor',
      rotation_period: '18',
      orbital_period: '402',
      diameter: '4900',
      climate: 'temperate',
      gravity: '0.85 standard',
      terrain: 'forests, mountains, lakes',
      surface_water: '8',
      population: '30000000',
      residents: [
        'https://swapi-trybe.herokuapp.com/api/people/30/',
      ],
      films: [
        'https://swapi-trybe.herokuapp.com/api/films/3/',
      ],
      created: '2014-12-10T11:50:29.349000Z',
      edited: '2014-12-20T20:58:18.429000Z',
      url: 'https://swapi-trybe.herokuapp.com/api/planets/7/',
    },
  ],
};

export default mockData;
