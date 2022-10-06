import React, { useContext } from 'react';
import { Context } from '../context/context';
import { COLUMN_ITEM, COMPARISON_ITEM } from '../Data/Index';
import Sort from './Sort';

const Filter = () => {
  const { setColumnFilter, planetList, comparisonFilter, valueFilter, columnFilter,
    setComparisonFilter, setValueFilter, setFilteredPlanetList, setFilterList,
    filterList, filteredPlanetList, columnItem,
    setColumnItem } = useContext(Context);

  const handleChange = ({ target }) => {
    const { value } = target;
    const filter = planetList.filter((planet) => planet.name
      .toLowerCase().includes(value.toLowerCase()));
    setFilteredPlanetList(filter);
  };

  const addNewFilter = () => {
    const obj = {
      columnFilter,
      comparisonFilter,
      valueFilter: Number(valueFilter),
    };
    setFilterList((previousState) => (previousState.concat(obj)));
  };

  const attColumnItem = () => {
    const newColumnItem = columnItem.filter((item) => item !== columnFilter);
    setColumnItem(newColumnItem);
    setColumnFilter(newColumnItem[0]);
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
    default:
      setFilteredPlanetList(ifFilteredPlanetList
        .filter((planet) => Number(planet[columnFilter]) === Number(valueFilter)));
      break;
    }
    addNewFilter();
    attColumnItem();
  };

  const attFilter = (newList) => {
    let reFiltered = [...planetList];
    newList.forEach((filter) => {
      switch (filter.comparisonFilter) {
      case 'maior que': {
        reFiltered = reFiltered
          .filter((planet) => Number(planet[filter.columnFilter]) > Number(filter
            .valueFilter));
        break;
      }
      case 'menor que': {
        reFiltered = reFiltered
          .filter((planet) => Number(planet[filter.columnFilter]) < Number(filter
            .valueFilter));
        break;
      }
      default:
        reFiltered = reFiltered
          .filter((planet) => Number(planet[filter.columnFilter]) === Number(filter
            .valueFilter));
        break;
      }
    });
    setFilteredPlanetList(reFiltered);
  };

  const deleteFilter = ({ target }) => {
    const { name } = target;
    const newColumnItem = [...columnItem];
    if (name === 'population') {
      newColumnItem.unshift(name);
      setColumnItem(newColumnItem);
    } else {
      setColumnItem(columnItem.concat(name));
    }
    const newFilterList = filterList.filter((filter) => filter.columnFilter !== name);
    setFilterList(newFilterList);
    attFilter(newFilterList);
  };

  const deleteAllFilter = () => {
    setColumnItem(COLUMN_ITEM);
    setFilterList([]);
    setFilteredPlanetList(planetList);
  };

  return (
    <div>
      <label htmlFor="filter-name">
        Filtrar pelo nome
        <input
          name="filter-name"
          type="text"
          onChange={ handleChange }
          data-testid="name-filter"
        />
      </label>
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
              columnItem.map((item, index) => (
                <option key={ index } value={ item }>{ item }</option>
              ))
            }
          </select>
        </label>
      </div>
      <div>
        <label htmlFor="comparison-filter">
          comparison
          <select
            onChange={ ({ target }) => setComparisonFilter(target.value) }
            data-testid="comparison-filter"
            name="column-filter"
            id="comparison-filter"
          >
            {
              COMPARISON_ITEM.map((item, index) => (
                <option
                  data-testid="column-opt"
                  key={ index }
                  value={ item }
                >
                  { item }

                </option>
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
        <div
          data-testid="filter"
          key={ index }
        >
          <p name={ filter.columnFilter }>{filter.columnFilter}</p>
          <p name={ filter.comparisonFilter }>{filter.comparisonFilter}</p>
          <p name={ filter.valueFilter }>{filter.valueFilter}</p>
          <button
            name={ filter.columnFilter }
            data-testid={ `delete-filter-${filter.columnFilter}` }
            onClick={ deleteFilter }
            type="button"
          >
            x
          </button>
        </div>
      ))}
      <br />
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ deleteAllFilter }
      >
        Remover todas filtragens
      </button>
      <hr />
      <br />
      <Sort />
    </div>
  );
};

export default Filter;
