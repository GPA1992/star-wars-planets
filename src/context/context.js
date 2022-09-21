import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const Context = createContext();

const Provider = ({ children }) => {
  const [planetList, setPlanetList] = useState([]);
  const [headerTable, setHeaderTable] = useState([]);
  const [filter, setFilter] = useState('');

  const fetchPlanetList = async () => {
    const { results } = await fetch('https://swapi.dev/api/planets').then((response) => response.json());
    results.forEach((planet) => delete planet.residents);
    setPlanetList(results);
    const header = Object.keys(results[0]);
    setHeaderTable(header);
  };

  const context = {
    planetList,
    headerTable,
    fetchPlanetList,
    filter,
    setFilter,
  };

  return (
    <Context.Provider value={ context }>
      {children}
    </Context.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.string.isRequired,
};

export { Context, Provider };
