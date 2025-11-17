
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LocationsScreen from '../LocationsScreen';

jest.mock('../../api', () => ({
  listLocations: jest.fn().mockResolvedValue([]),
  createLocation: jest.fn().mockResolvedValue({})
}));

describe('LocationsScreen', () => {
  it('renders and allows creating', async () => {
    const { getByText, getByLabelText } = render(<LocationsScreen navigation={{ navigate: jest.fn() }} />);
    await waitFor(() => getByText('Cadastrar novo local'));
    const input = getByLabelText('Nome');
    fireEvent.changeText(input, 'Rua A');
    fireEvent.press(getByText('Salvar'));
  });
});
