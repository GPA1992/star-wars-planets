import React from 'react';
import usePlanets from '../hooks/usePlanets';

const Table = () => {
  const [planetList, headerTable] = usePlanets();
  console.log(planetList);
  return (
    <div>
      <table>
        <thead>
          <tr>
            { headerTable.map((headerItem, index) => (
              <th key={ index }>{headerItem}</th>
            )) }
          </tr>
        </thead>
        <tbody>
          { planetList.map((planet, index) => (
            <tr key={ index }>
              { headerTable.map((key, i) => (
                <td key={ i }>{ planet[key] }</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
