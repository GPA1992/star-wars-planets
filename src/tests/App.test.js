import React from 'react';
import { within, render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import mockData from '../Helpers/MockData';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import testData from '../../cypress/mocks/testData';
import mockDataTwoPlanets from '../Helpers/MockDataTwoPlanets';

describe('Testa os filtros e o funcionamento geral da página', () => {
/*   beforeEach(() => {

  }) */
  it(`Testa se ao digitar um nome no input ele vai
      retornar apenas o nome que contem o texto digitado`, async () => {
        global.fetch = jest.fn().mockResolvedValue({
          json: jest.fn()
            .mockResolvedValue(testData)
        });
          render(<App />)
        expect(await screen.findAllByTestId('planet-name')).toHaveLength(10)
        const inputNameFilter = await screen.findByTestId('name-filter')
        const tatooinePlanet = await screen.findByText(/tatooine/i)
        const alderaanPlanet = await screen.findByText(/alderaan/i)
        await waitFor(() => {
          userEvent.click(inputNameFilter)
          userEvent.type(inputNameFilter, 'Tatooine')
        })
        expect(tatooinePlanet).toBeInTheDocument()
        expect(alderaanPlanet).not.toBeInTheDocument()
        expect(await screen.findAllByTestId('planet-name')).toHaveLength(1)
  })
  it('Testa o funcionamento do filtro após o preenchimento do input, usando o comparison menor que', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn()
        .mockResolvedValue(testData)
    });
    render(<App />)

    expect(await screen.findAllByTestId('planet-name')).toHaveLength(10)

    userEvent.selectOptions(screen.getByRole('combobox', { name: /coluna/i }), 'diameter');
    userEvent.selectOptions(screen.getByRole('combobox', { name: /comparison/i }), 'menor que');
    userEvent.type(screen.getByTestId('value-filter'), '7201')
    userEvent.click(screen.getByTestId('button-filter'))
    expect(screen.getAllByTestId('planet-name')).toHaveLength(2)
    expect(screen.getByTestId('filter')).toBeInTheDocument();


    userEvent.click(screen.getByTestId('delete-filter-diameter'));
    expect(screen.queryByTestId('filter')).not.toBeInTheDocument();
    expect(screen.getAllByTestId('planet-name')).toHaveLength(10)

  })
  it('Testa o funcionamento do filtro após o preenchimento do input, usando o comparison maior que', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn()
        .mockResolvedValue(testData)
    });
    render(<App />)
    expect(await screen.findAllByTestId('planet-name')).toHaveLength(10)

    userEvent.selectOptions(screen.getByRole('combobox', { name: /coluna/i }), 'diameter');
    userEvent.selectOptions(screen.getByRole('combobox', { name: /comparison/i }), 'maior que');
    userEvent.type(screen.getByTestId('value-filter'), '50000')
    userEvent.click(screen.getByTestId('button-filter'))
    expect(screen.getAllByTestId('planet-name')).toHaveLength(1)
    expect(screen.getByTestId('filter')).toBeInTheDocument();


    userEvent.click(screen.getByTestId('delete-filter-diameter'));
    expect(screen.queryByTestId('filter')).not.toBeInTheDocument();
    expect(screen.getAllByTestId('planet-name')).toHaveLength(10)
  })
  it('Testa o funcionamento do filtro após o preenchimento do input, usando o comparison igual a', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn()
        .mockResolvedValue(testData)
    });
    render(<App />)
    expect(await screen.findAllByTestId('planet-name')).toHaveLength(10)

    userEvent.selectOptions(screen.getByRole('combobox', { name: /coluna/i }), 'population');
    userEvent.selectOptions(screen.getByRole('combobox', { name: /comparison/i }), 'igual a');
    userEvent.type(screen.getByTestId('value-filter'), '200000')
    userEvent.click(screen.getByTestId('button-filter'))
    expect(screen.getAllByTestId('planet-name')).toHaveLength(1)
    expect(screen.getByTestId('filter')).toBeInTheDocument();


    userEvent.click(screen.getByTestId('delete-filter-population'));
    expect(screen.queryByTestId('filter')).not.toBeInTheDocument();
    expect(screen.getAllByTestId('planet-name')).toHaveLength(10)
  })
  it('Testa o botão de deletar um filtro', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn()
      .mockResolvedValue(mockDataTwoPlanets)
    });
    render(<App />)
      userEvent.selectOptions(screen.getByRole('combobox', {name: /coluna/i}), 'orbital_period');
      userEvent.selectOptions(screen.getByRole('combobox', { name: /comparison/i }), 'menor que');
      userEvent.type(screen.getByTestId('value-filter'), '500')
      userEvent.click(screen.getByRole('button', { name: /filtrar/i }))

      userEvent.selectOptions(screen.getByRole('combobox', {name: /coluna/i}), 'diameter');
      userEvent.selectOptions(screen.getByRole('combobox', { name: /comparison/i }), 'maior que');
      userEvent.type(screen.getByTestId('value-filter'), '4900')
      userEvent.click(screen.getByRole('button', { name: /filtrar/i }))

      userEvent.selectOptions(screen.getByRole('combobox', {name: /coluna/i}), 'rotation_period');
      userEvent.selectOptions(screen.getByRole('combobox', { name: /comparison/i }), 'igual a');
      userEvent.type(screen.getByTestId('value-filter'), '23')
      userEvent.click(screen.getByRole('button', { name: /filtrar/i }))

      userEvent.selectOptions(screen.getByRole('combobox', {name: /coluna/i}), 'population');
      userEvent.selectOptions(screen.getByRole('combobox', { name: /comparison/i }), 'maior que');
      userEvent.type(screen.getByTestId('value-filter'), '150000')
      userEvent.click(screen.getByRole('button', { name: /filtrar/i }))

      userEvent.click(screen.getByTestId('delete-filter-population'))

      expect( await screen.findAllByTestId('planet-name')).toHaveLength(2)
      })
})
