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
      valueFilter,
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
    case 'igual a': {
      setFilteredPlanetList(ifFilteredPlanetList
        .filter((planet) => Number(planet[columnFilter]) === Number(valueFilter)));
      break;
    }
    default:
      setFilteredPlanetList([]);
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
      case 'igual a': {
        reFiltered = reFiltered
          .filter((planet) => Number(planet[filter.columnFilter]) === Number(filter
            .valueFilter));
        break;
      }
      default:
        console.log('deu ruim');
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
        <div
          data-testid="filter"
          key={ index }
          name={ filter.columnFilter }
        >
          <span>{filter.columnFilter}</span>
          <span>{filter.comparisonFilter}</span>
          <span>{filter.valueFilter}</span>
          <button
            name={ filter.columnFilter }
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
