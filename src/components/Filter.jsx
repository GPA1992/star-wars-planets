import React, { useContext } from 'react';
import { Context } from '../context/context';

const Filter = () => {
  const { setFilter } = useContext(Context);

  const handleChange = ({ target }) => {
    const { value } = target;
    setFilter(value.toLowerCase());
  };

  return (
    <div>
      <form action="">
        <input
          type="text"
          onChange={ handleChange }
          data-testid="name-filter"
        />
      </form>
    </div>
  );
};

export default Filter;
