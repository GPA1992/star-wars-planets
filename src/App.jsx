import React from 'react';
import './App.css';
import Filter from './components/Filter';
import Table from './components/Table';
import { Provider } from './context/context';

function App() {
  return (
    <Provider>
      <div>
        <Filter />
        <Table />
      </div>
    </Provider>
  );
}

export default App;
