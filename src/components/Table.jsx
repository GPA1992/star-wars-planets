import React, { useContext, useEffect } from 'react';
import { Context } from '../context/context';
import './Table.css';

const Table = () => {
  const { planetList, headerTable, valueFilter,
    filteredPlanetList, columnItem, filterList, setPlanetList,
    setHeaderTable, sortOrder } = useContext(Context);

  useEffect(() => {
    const fetchPlanetList = async () => {
      const { results } = await fetch('https://swapi.dev/api/planets').then((response) => response.json());
      results.forEach((planet) => delete planet.residents);
      setPlanetList(results);
      const header = Object.keys(results[0]);
      setHeaderTable(header);
    };
    fetchPlanetList();
    localStorage.setItem('planetList', JSON.stringify(planetList));
  }, [valueFilter, columnItem, filteredPlanetList, filterList, sortOrder]);

  const planets = filteredPlanetList.length > 0 ? filteredPlanetList : planetList;
  const headerFiltered = headerTable.filter((headerKey) => (
    headerKey !== 'films' && headerKey !== 'name'));
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>name</th>
            { headerFiltered.map((headerItem, index) => (
              <th key={ index }>{headerItem}</th>
            )) }
            <th>films</th>
          </tr>
        </thead>
        <tbody>
          { planets.map((planet, index) => (
            <tr data-testid="planet-info" key={ index }>
              <td data-testid="planet-name">{planet.name}</td>
              { headerFiltered.map((key, i) => (
                <td key={ i }>{ planet[key] }</td>
              ))}
              <td>
                { planet.films.map((film) => (
                  <li key={ film }>{film}</li>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
