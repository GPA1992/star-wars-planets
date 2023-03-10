import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { COLUMN_ITEM, COMPARISON_ITEM } from '../Data/Index';

const Context = createContext();

const Provider = ({ children }) => {
  const [planetList, setPlanetList] = useState([]);
  const [headerTable, setHeaderTable] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [columnItem, setColumnItem] = useState(COLUMN_ITEM);
  const [columnFilter, setColumnFilter] = useState(columnItem[0]);
  const [comparisonFilter, setComparisonFilter] = useState(COMPARISON_ITEM[0]);
  const [valueFilter, setValueFilter] = useState(0);
  const [filteredPlanetList, setFilteredPlanetList] = useState([]);
  const [sortOrder, setSortOrder] = useState({ column: 'population', sort: 'ASC' });

  const context = {
    setPlanetList,
    setHeaderTable,
    planetList,
    headerTable,
    filterList,
    setFilterList,
    columnFilter,
    setColumnFilter,
    comparisonFilter,
    setComparisonFilter,
    valueFilter,
    setValueFilter,
    filteredPlanetList,
    setFilteredPlanetList,
    columnItem,
    setColumnItem,
    sortOrder,
    setSortOrder,
  };

  return (
    <Context.Provider value={ context }>
      {children}
    </Context.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { Context, Provider };
