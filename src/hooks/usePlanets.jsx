import { useState, useEffect } from 'react';

const usePlanets = () => {
  const [planetList, setPlanetList] = useState([]);
  const [headerTable, setHeaderTable] = useState([]);

  useEffect(() => {
    const fetchPlanetList = async () => {
      const { results } = await fetch('https://swapi.dev/api/planets').then((response) => response.json());
      results.forEach((planet) => delete planet.residents);
      setPlanetList(results);
      const header = Object.keys(results[0]);
      setHeaderTable(header);
    };
    fetchPlanetList();
  }, []);
  return [planetList, headerTable];
};

export default usePlanets;
