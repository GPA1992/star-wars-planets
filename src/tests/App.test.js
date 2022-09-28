import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from '../context/context';
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
      retornar o nome que contem o texto digitado`, async () => {
        render(<Provider><App /></Provider> )
        await waitFor(() => {
        const inputNameFilter = screen.getByTestId('name-filter')
        userEvent.type(inputNameFilter, 'tatooine')
        const tatooinePlanet = screen.getByRole('cell', { name: /tatooine/i })
        expect(tatooinePlanet).toBeInTheDocument()
        })
      })

})
