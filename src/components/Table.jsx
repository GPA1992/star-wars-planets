import React from 'react';
import usePlanets from '../hooks/usePlanets';
import './Table.css';

const Table = () => {
  const [planetList, headerTable] = usePlanets();
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
          { planetList.map((planet, index) => (
            <tr key={ index }>
              { noFilms.map((key, i) => (
                <td key={ i }>{ planet[key] }</td>
              ))}
              <td>
                { planet.films.map((film) => (
                  <li key={ index }>{film}</li>
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
