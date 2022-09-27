import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import mockData from '../../cypress/mocks/testData';
import App from '../App';

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
    json: () => Promise.resolve(mockData),
  }));
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('testa app', () => {
  it('testa se ao digitar 00 aparece apenas 3 planetas', async () => {
    render(<App />);
    const number = 3;
    await waitFor(() => expect(fetch).toHaveBeenCalled());

    const inputName = screen.getByTestId('name-filter');

    userEvent.type(inputName, 'oo');
    expect(screen.getAllByRole('row')).toHaveLength(number);
  });

  test('testa radio buttons', async () => {
    render(<App />);
    await waitFor(() => expect(fetch).toHaveBeenCalled());

    const colunSort = screen.getByTestId('column-sort');
    const radioAsc = screen.getByLabelText('ASC');
    const radioDesc = screen.getByLabelText('DESC');
    const columnSortButton = screen.getByTestId('column-sort-button');

    userEvent.selectOptions(colunSort, 'rotation_period');
    userEvent.click(radioAsc);
    userEvent.click(columnSortButton);
    userEvent.click(radioDesc);
    userEvent.click(columnSortButton);
  });
});
