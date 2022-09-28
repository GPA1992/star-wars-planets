import React, { useContext, useEffect } from 'react';
import { Context } from '../context/context';
import { COLUMN_ITEM } from '../Data/Index';

const Sort = () => {
  const { filteredPlanetList, sortOrder, setSortOrder,
    planetList, setFilteredPlanetList } = useContext(Context);

  useEffect(() => {
  }, [sortOrder]);

  const handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setSortOrder((previousValue) => ({
      ...previousValue,
      [name]: value,
    }));
  };

  const handleClick = () => {
    const planets = filteredPlanetList.length > 0 ? filteredPlanetList : planetList;
    const planetsForSort = [...planets];
    const { column, sort } = sortOrder;

    const unknownFiltered = planetsForSort.filter((plan) => (
      plan[column] === 'unknown'));

    const sorted = planetsForSort.sort((planetA, planetB) => (sort === 'ASC'
      ? planetA[column] - planetB[column] : planetB[column] - planetA[column]
    )).filter((uknPlanet) => uknPlanet[column] !== 'unknown');
    sorted.push(...unknownFiltered);

    setFilteredPlanetList(sorted);
  };

  return (
    <div>
      <div>
        <select
          onChange={ handleChange }
          data-testid="column-sort"
          name="column"
          id="column-sort"
        >
          {
            COLUMN_ITEM.map((item, index) => (
              <option key={ index } value={ item }>{ item }</option>
            ))
          }
        </select>
        <div>
          <label htmlFor="ASC">
            Ascendente
            <input
              onChange={ handleChange }
              data-testid="column-sort-input-asc"
              name="sort"
              type="radio"
              value="ASC"
              id="ASC"
            />
          </label>
        </div>
        <div>
          <label htmlFor="DESC">
            Descendente
            <input
              onChange={ handleChange }
              data-testid="column-sort-input-desc"
              name="sort"
              type="radio"
              id="DESC"
              value="DESC"
            />
          </label>
        </div>
        <div>
          <br />
        </div>
      </div>
      <button
        data-testid="column-sort-button"
        type="button"
        onClick={ handleClick }
      >
        Ordenar
      </button>
    </div>
  );
};

export default Sort;
