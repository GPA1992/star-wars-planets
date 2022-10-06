import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import testData from '../../cypress/mocks/testData';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

describe('Testa os itens que fazem a ordenação da tabela', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(testData),
    }));
  })
  it('testa se os campos para fazer a ordenação existem', () => {
    render(<App />)
    expect(screen.getByTestId('column-sort')).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: /ascendente/i })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /descendente/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ordenar/i })).toBeInTheDocument();
  })
  it('Testa se ao escolher uma coluna population e ordernar em ordem ascendente, é aplicado o filtro corretamente', async () => {
    render(<App />)
    act(() => {
      waitFor(() => {
        userEvent.selectOptions(screen.getByTestId('column-sort'), 'population')
        userEvent.click(screen.getByTestId('column-sort-input-asc'))
        userEvent.click(screen.getByTestId('column-sort-button'))
        const planetTable = screen.getAllByTestId('planet-name')
        expect(planetTable[0]).toHaveFormValue('Yavin IV')
      })
    })
  })
  it('Testa se ao escolher uma coluna population e ordernar em ordem descendente, é aplicado o filtro corretamente', async () => {
    render(<App />)
    act(() => {
      waitFor(() => {
        userEvent.selectOptions(screen.getByTestId('column-sort'), 'population')
        userEvent.click(screen.getByTestId('column-sort-input-desc'))
        userEvent.click(screen.getByTestId('column-sort-button'))
        const planetTable = screen.getAllByTestId('planet-name')
        expect(planetTable[0]).toHaveFormValue('Coruscant')
      })
    })
  })
})
