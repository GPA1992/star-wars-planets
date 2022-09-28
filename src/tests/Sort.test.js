import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Testa os itens que fazem a ordenação da tabela', () => {
  it(`Testa se existe um campo para escolher para qual item da
       coluna sera feita a ordenação`, () => {
    render(<App />)
    const columnOrdenationInput = screen.getByTestId('column-sort');
    expect(columnOrdenationInput).toBeInTheDocument();
  })
  it('Testa se existe uma opção de checkbox radio, com o label Ascendente', () => {
    render(<App />)
    const ascRadio = screen.getByRole('radio', {
      name: /ascendente/i
    })
    expect(ascRadio).toBeInTheDocument();
  })
  it('Testa se existe uma opção de checkbox radio, com o label Descendente', () => {
    render(<App />)
    const descRadio = screen.getByRole('radio', {
      name: /descendente/i
    })
    expect(descRadio).toBeInTheDocument();
  })
  it('Testa se existe um botão para ordenar a tabela baseado nas regras de ordenação', () => {
    render(<App />)
    const orderButton = screen.getByRole('button', {
      name: /ordenar/i
    })
    expect(orderButton).toBeInTheDocument();
  })
})
