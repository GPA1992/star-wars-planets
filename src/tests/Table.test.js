import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from '../context/context';
import App from '../App';
import planetListMock from '../Helpers/MockData'

describe('Testa se a estrutura da tabela está correta', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(planetListMock),
    }));
  })
  it('Testa se um cabeçalho é renderizado na tela com todos os itens corretamente', async () => {
    render(<Provider><App /></Provider> )
    expect(fetch).toBeCalled()
    await waitFor(() => {
      const tableHeader = screen.getAllByRole('columnheader')
      expect(tableHeader).toHaveLength(13)
    })
  });
  it('Testa se todos os planetas foram renderizados', async () => {
    render(<Provider><App /></Provider> )
    const { results } = planetListMock;
    results.forEach( async (planet) => {
      await waitFor(() => {
        const planetName = screen.getByText(/planet.name/i)
        expect(planetName).toBeInTheDocument();
      })
    })
  })
})
