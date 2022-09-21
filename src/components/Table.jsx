import React, { useContext, useEffect } from 'react';
import { Context } from '../context/context';
import './Table.css';

const Table = () => {
  const { planetList, headerTable, fetchPlanetList, filter } = useContext(Context);

  useEffect(() => {
    fetchPlanetList();
  }, [filter]);

  const newPlanetlist = planetList.filter((planet) => planet
    .name.toLowerCase().includes(filter));
  const noFilms = headerTable.filter((headerKey) => headerKey !== 'films');
  return (
    <div>
      <table>
        <thead>
          <tr>
            { noFilms.map((headerItem, index) => (
              <th key={ index }>{headerItem}</th>
            )) }
            <th>films</th>
          </tr>
        </thead>
        <tbody>
          { newPlanetlist.map((planet, index) => (
            <tr key={ index }>
              { noFilms.map((key, i) => (
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
