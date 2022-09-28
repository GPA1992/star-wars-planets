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
  it('Testa o funcionamento do filtro após o preenchimento do input, usando o comparison menor que', async () => {
    render(<App />)
    const planetList = await screen.findAllByTestId('planet-name')
    expect(planetList).toHaveLength(10)

    const columnInput = screen.getByRole('combobox', {
      name: /coluna/i,
    });


    const comparisonInput = screen.getByRole('combobox', {
      name: /comparison/i,
    });


    const valueInput = screen.getByTestId('value-filter')


    const filterButton = screen.getByRole('button', {
      name: /filtrar/i
    })

    // menor que
    userEvent.selectOptions(columnInput, 'diameter');
    userEvent.selectOptions(comparisonInput, 'menor que');
    userEvent.type(valueInput, '7201')
    userEvent.click(filterButton)

    const planetListAfterFilter = await screen.findAllByTestId('planet-name')
    expect(planetListAfterFilter ).toHaveLength(2)

    const filter = screen.getByTestId('filter')
    expect(filter).toBeInTheDocument();
    const deleteFilterButton = screen.getByRole('button', {
      name: /x/i
    })
    userEvent.click(deleteFilterButton);
    expect(filter).not.toBeInTheDocument();
  })
  it('Testa o funcionamento do filtro após o preenchimento do input, usando o comparison maior que', async () => {
    render(<App />)
    const planetList = await screen.findAllByTestId('planet-name')
    expect(planetList).toHaveLength(10)

    const columnInput = screen.getByRole('combobox', {
      name: /coluna/i,
    });
    userEvent.selectOptions(columnInput, 'population');

    const comparisonInput = screen.getByRole('combobox', {
      name: /comparison/i,
    });
    userEvent.selectOptions(comparisonInput, 'maior que');

    const valueInput = screen.getByTestId('value-filter')
    userEvent.type(valueInput, '1001')

    const filterButton = screen.getByRole('button', {
      name: /filtrar/i
    })
    userEvent.click(filterButton)

    const planetListAfterFilter = await screen.findAllByTestId('planet-name')
    expect(planetListAfterFilter ).toHaveLength(7)

    const filter = screen.getByTestId('filter')
    expect(filter).toBeInTheDocument();
    const deleteFilterButton = screen.getByRole('button', {
      name: /x/i
    })
    userEvent.click(deleteFilterButton);
    expect(filter).not.toBeInTheDocument();
  })
  it('Testa o funcionamento do filtro após o preenchimento do input, usando o comparison igual a', async () => {
    render(<App />)
    const planetList = await screen.findAllByTestId('planet-name')
    expect(planetList).toHaveLength(10)

    const columnOptions = screen.getAllByRole('option')
    expect(columnOptions).toHaveLength(13)

    const columnInput = screen.getByRole('combobox', {
      name: /coluna/i,
    });
    userEvent.selectOptions(columnInput, 'surface_water');

    const comparisonInput = screen.getByRole('combobox', {
      name: /comparison/i,
    });
    userEvent.selectOptions(comparisonInput, 'igual a');

    const valueInput = screen.getByTestId('value-filter')
    userEvent.type(valueInput, '100')

    const filterButton = screen.getByRole('button', {
      name: /filtrar/i
    })
    userEvent.click(filterButton)

    const planetListAfterFilter = await screen.findAllByTestId('planet-name')
    expect(planetListAfterFilter ).toHaveLength(2)

    const columnOptionsAfterFilter = screen.getAllByRole('option')
    expect(columnOptionsAfterFilter).toHaveLength(12)

    const filter = screen.getByTestId('filter')
    expect(filter).toBeInTheDocument();
    const deleteFilterButton = screen.getByRole('button', {
      name: /x/i
    })
    userEvent.click(deleteFilterButton);
    expect(filter).not.toBeInTheDocument();

    const columnOptionsAfterDeleteFilter = screen.getAllByRole('option')
    expect(columnOptionsAfterDeleteFilter).toHaveLength(13)

    const planetListAfterDeleteFilter = await screen.findAllByTestId('planet-name')
    expect(planetListAfterDeleteFilter).toHaveLength(10)

    const deleteAllFilter = screen.getByRole('button', {  name: /remover todas filtragens/i})
    userEvent.click(deleteAllFilter);
    const planetListAfterDeleteAllFilter = await screen.findAllByTestId('planet-name')
    expect(planetListAfterDeleteAllFilter).toHaveLength(10)
  })
  it('Testa o botão de deletar os filtros', async () => {
    render(<App />)
    const planetList = await screen.findAllByTestId('planet-name')
    expect(planetList).toHaveLength(10)

    const columnOptions = screen.getAllByRole('option')
    expect(columnOptions).toHaveLength(13)

    const columnInput = screen.getByRole('combobox', {
      name: /coluna/i,
    });

    const comparisonInput = screen.getByRole('combobox', {
      name: /comparison/i,
    });

    const valueInput = screen.getByTestId('value-filter')

    const filterButton = screen.getByRole('button', {
      name: /filtrar/i
    })

    userEvent.selectOptions(columnInput, 'diameter');
    userEvent.selectOptions(comparisonInput, 'menor que');
    userEvent.type(valueInput, '7500')
    userEvent.click(filterButton)

    const planetsFiltered = await screen.findAllByTestId('planet-name')
    expect(planetsFiltered).toHaveLength(2)

    const filter = screen.getByTestId('filter')
    expect(filter).toBeInTheDocument();
    const deleteFilterButton = screen.getByRole('button', {
      name: /x/i
    })
    userEvent.click(deleteFilterButton);
    const removeFilter = await screen.findAllByTestId('planet-name')
    expect(removeFilter).toHaveLength(10)
  })
})
