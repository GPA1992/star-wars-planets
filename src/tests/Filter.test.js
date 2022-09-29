import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { toBeInTheDocument } from '@testing-library/jest-dom/dist/matchers';

describe('Testa os items que fazem a filtragem da tabela', () => {
  it('1 - Testa se existe um campo para digitar o nome de uma planeta', () => {
    render(<App />);
    expect(screen.getByTestId("name-filter")).toBeInTheDocument();
  })
  it('2 - Testa se existe um campo para filtrar a tabela com os itens da coluna', () => {
    render(<App />);
    expect(screen.getByRole('combobox', { name: /coluna/i })).toBeInTheDocument();
  })
  it('3 - Testa se existe um campo para escolher o tipo de comparação do filtro', () => {
    render(<App />)
    expect(screen.getByRole('combobox', { name: /comparison/i })).toBeInTheDocument();
  })
  it(`4 - Testa se existe um campo para digitar o valor da regra de negocio
      imposta pelos filtros`, () => {
        render(<App />)
        expect(screen.getByTestId('value-filter')).toBeInTheDocument();
  })
  it(`5 - Testa se existe um botão de filtragem da tabela baseado
      no filtro estabelecido`, () => {
      render(<App />)
      expect(screen.getByRole('button', { name: /filtrar/i })).toBeInTheDocument();
  })
  it('6 - Testa se existe um botão para remover todos os filtros', () => {
      render(<App />)
      expect(screen.getByRole('button', { name: /remover todas filtragens/i })).toBeInTheDocument()
  })
});
