import React, { useContext } from 'react';
import { Context } from '../context/context';
import { COLUMN_ITEM, COMPARISON_ITEM } from '../Data/Index';

const Filter = () => {
  const { setColumnFilter, planetList, comparisonFilter, valueFilter, columnFilter,
    setComparisonFilter, setValueFilter, setFilteredPlanetList, setFilterList,
    filterList, filteredPlanetList } = useContext(Context);

  const handleChange = ({ target }) => {
    const { value } = target;
    const filtro = planetList.filter((planet) => planet.name
      .toLowerCase().includes(value));
    setFilteredPlanetList(filtro);
  };

  const handleClick = () => {
    const ifFilteredPlanetList = filteredPlanetList
      .length > 0 ? filteredPlanetList : planetList;
    switch (comparisonFilter) {
    case 'maior que': {
      setFilteredPlanetList(ifFilteredPlanetList
        .filter((planet) => Number(planet[columnFilter]) > Number(valueFilter)));
      break;
    }
    case 'menor que': {
      setFilteredPlanetList(ifFilteredPlanetList
        .filter((planet) => Number(planet[columnFilter]) < Number(valueFilter)));
      break;
    }
    case 'igual a': {
      setFilteredPlanetList(ifFilteredPlanetList
        .filter((planet) => Number(planet[columnFilter]) === Number(valueFilter)));
      break;
    }
    default:
      setFilteredPlanetList([]);
    }
    const obj = {
      columnFilter,
      comparisonFilter,
      valueFilter,
    };

    setFilterList((previousState) => (previousState.concat(obj)));
    console.log(filterList);
  };
  return (
    <div>
      <input
        type="text"
        onChange={ handleChange }
        data-testid="name-filter"
      />
      <div>
        <label htmlFor="column-filter">
          coluna
          <select
            onChange={ ({ target }) => setColumnFilter(target.value) }
            data-testid="column-filter"
            name="column-filter"
            id="column-filter"
          >
            {
              COLUMN_ITEM.map((item, index) => (
                <option key={ index } value={ item }>{ item }</option>
              ))
            }
          </select>
        </label>
      </div>
      <div>
        <label htmlFor="comparison-filter">
          Comparison
          <select
            name="comparison-filter"
            id="comparison-filter"
            data-testid="comparison-filter"
            onChange={ ({ target }) => setComparisonFilter(target.value) }
          >
            {
              COMPARISON_ITEM.map((item, index) => (
                <option key={ index } value={ item }>{ item }</option>
              ))
            }
          </select>
        </label>
      </div>
      <div>
        <input
          onChange={ ({ target }) => setValueFilter(target.value) }
          data-testid="value-filter"
          type="text"
          value={ valueFilter }
        />
      </div>
      <button
        onClick={ handleClick }
        data-testid="button-filter"
        type="button"
      >
        Filtrar
      </button>
      {filterList.map((filter, index) => (
        <div key={ index }>
          <span>{filter.columnFilter}</span>
          <span>{filter.comparisonFilter}</span>
          <span>{filter.valueFilter}</span>
        </div>
      ))}
    </div>
  );
};

export default Filter;
