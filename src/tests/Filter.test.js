import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { toBeInTheDocument } from '@testing-library/jest-dom/dist/matchers';

describe('Testa os items que fazem a filtragem da tabela', () => {
  it('1 - Testa se existe um campo para digitar o nome de uma planeta', () => {
    render(<App />);
    const inputSearchFilter = screen.getByTestId("name-filter")
    expect(inputSearchFilter).toBeInTheDocument();
  })
  it('2 - Testa se existe um campo para filtrar a tabela com os itens da coluna', () => {
    render(<App />);
    const columnSelect = screen.getByRole('combobox', {
      name: /coluna/i,
    })
    expect(columnSelect).toBeInTheDocument();
  })
  it('3 - Testa se existe um campo para escolher o tipo de comparação do filtro', () => {
    render(<App />)
    const comparisonSelect = screen.getByRole('combobox', {
      name: /comparison/i,
    })
    expect(comparisonSelect).toBeInTheDocument();
  })
  it(`4 - Testa se existe um campo para digitar o valor da regra de negocio
      imposta pelos filtros`, () => {
        render(<App />)
        const inputValueFilter = screen.getByTestId('value-filter');
        expect(inputValueFilter).toBeInTheDocument();
  })
  it(`5 - Testa se existe um botão de filtragem da tabela baseado
      no filtro estabelecido`, () => {
      render(<App />)
      const filterButton = screen.getByRole('button', {
        name: /filtrar/i
      })
      expect(filterButton).toBeInTheDocument();
  })
  it('6 - Testa se existe um botão para remover todos os filtros', () => {
      render(<App />)
      const removeAllFilterButton = screen.getByRole('button', {
        name: /remover todas filtragens/i
      })
      expect(removeAllFilterButton).toBeInTheDocument()
  })
});
