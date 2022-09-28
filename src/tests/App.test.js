import React from 'react';
import { within, render, screen, waitFor, act } from '@testing-library/react';
import App from '../App';
import planetListMock from '../Helpers/MockData'
import userEvent from '@testing-library/user-event';

describe('Testa os filtros e o funcionamento geral da página', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(planetListMock),
    }));
  })
  it(`Testa se ao digitar um nome no input ele vai
      retornar apenas o nome que contem o texto digitado`, async () => {
        render(<App />)
        const inputNameFilter = await screen.findByTestId('name-filter')
        const planetList = await screen.findAllByTestId('planet-name')
        const tatooinePlanet = await screen.findByText(/tatooine/i)
        const alderaanPlanet = await screen.findByText(/alderaan/i)
        expect(planetList).toHaveLength(10)
        await waitFor(() => {
          userEvent.click(inputNameFilter)
          userEvent.type(inputNameFilter, 'Tatooine')
        })
        expect(tatooinePlanet).toBeInTheDocument()
        expect(alderaanPlanet).not.toBeInTheDocument()
        const planetListAfterFilter = await screen.findAllByTestId('planet-name')
        expect(planetListAfterFilter ).toHaveLength(1)
  })
  it('Testa o funcionamento do filtro após o preenchimento do input', () => {
    render(<App />)
    const columnInput = screen.getByRole('combobox', {
      name: /coluna/i,
    });
    userEvent.selectOptions(columnInput, within(columnInput).getByRole('option', { name: /diameter/i }));

    const comparisonInput = screen.getByRole('combobox', {
      name: /comparison/i,
    });
    userEvent.selectOptions(comparisonInput, within(comparisonInput).getByRole('option', { name: /menor que/i }));

    const valueInput = screen.getByTestId('value-filter')
    userEvent.click(valueInput)
    userEvent.type(valueInput, 7201)

    const filterButton = screen.getByRole('button', {
      name: /filtrar/i
    })

    userEvent.click(filterButton)
    const filter = screen.getByTestId('filter')
    expect(filter).toBeInTheDocument();

    const deleteFilterButton = screen.getByRole('button', {
      name: /x/i
    })
    userEvent.click(deleteFilterButton);
    expect(filter).not.toBeInTheDocument();
  })
})
