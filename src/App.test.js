import { render, screen, act, getAllByRole } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
import userEvent from '@testing-library/user-event';

test('user should be able to choose a vehicle', async () => {

  global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(['ford', 'audi']),
  })
);
  
  await act(async () => {
    await render(<App />);
  })

  expect(screen.getAllByRole('combobox')).toHaveLength(2)
  
  expect(screen.getByLabelText('Choose a make')).toBeEnabled()
  expect(screen.getByLabelText('Choose a model')).toBeDisabled()

  await act( async () => {
    fetch.mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(['scorpio', 'fiesta', 'sierra']),
    }));
    await userEvent.selectOptions(screen.getByLabelText('Choose a make'), 'ford');
  })

  expect(screen.getByLabelText('Choose a model')).toBeEnabled();
  expect(getAllByRole(screen.getByLabelText('Choose a model'), 'option')).toHaveLength(3);

  await act( async () => {
    fetch.mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve([{
        "make": "FORD",
        "model": "Fiesta",
        "enginePowerPS": 60,
        "enginePowerKW": 44,
        "fuelType": "Benzin",
        "bodyType": "Limousine",
        "engineCapacity": 1299
      },
      {
        "make": "FORD",
        "model": "Fiesta",
        "enginePowerPS": 68,
        "enginePowerKW": 50,
        "fuelType": "Diesel",
        "bodyType": "Limousine",
        "engineCapacity": 1399
      }]),
    }));
    await userEvent.selectOptions(screen.getByLabelText('Choose a model'), 'fiesta');
  })

  expect(screen.queryByRole('table')).toBeInTheDocument()
  expect(screen.queryAllByRole('row')).toHaveLength(3)
  expect(screen.queryAllByRole('radio')).toHaveLength(2)
  
  jest.spyOn(window, 'alert').mockImplementation(() => {});
  userEvent.click(screen.queryAllByRole('radio')[0])

  expect(window.alert).toHaveBeenCalledWith(JSON.stringify({
    "make": "FORD",
    "model": "Fiesta",
    "enginePowerPS": 60,
    "enginePowerKW": 44,
    "fuelType": "Benzin",
    "bodyType": "Limousine",
    "engineCapacity": 1299
  }))

});
