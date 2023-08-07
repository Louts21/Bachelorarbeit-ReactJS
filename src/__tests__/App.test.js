import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import Data from '../Component/Data';
import Header from '../Component/Header';
import Footer from '../Component/Footer';
import NotFound from '../Component/NotFound';

// https://stackoverflow.com/questions/58613492/how-to-resolve-cannot-use-import-statement-outside-a-module-from-jest-when-run
test("Test app content", () => {
  render(<App />);

  const welcomElement = screen.getByText(/welcome/i);
  const kevinElement = screen.getByText(/kevin j./i);
  const backToMainElement = screen.getByText(/back to main/i);
  const apiDataElement = screen.getByText(/api data/i);

  expect(welcomElement).toBeInTheDocument();
  expect(kevinElement).toBeInTheDocument();
  expect(backToMainElement).toBeInTheDocument();
  expect(apiDataElement).toBeInTheDocument();
});

test("Test data content", async () => {
  render(<Data />);

  await waitFor(() => {
    const nominatimReverse = screen.getByText(/nominatim reverse:/i);
    const nominatim = screen.getByText(/nominatim:/i);
    const database = screen.getByText(/own db data: /i);

    expect(nominatimReverse).toBeInTheDocument();
    expect(nominatim).toBeInTheDocument();
    expect(database).toBeInTheDocument();
  })
});

test("Test header content", () => {
  render(<Header />);

  const backToMainElement = screen.getByText(/back to main/i);
  const apiDataElement = screen.getByText(/api data/i);

  expect(backToMainElement).toBeInTheDocument();
  expect(apiDataElement).toBeInTheDocument();
});

test("Test footer content", () => {
  render(<Footer />);

  const kevinElement = screen.getByText(/kevin j./i);

  expect(kevinElement).toBeInTheDocument();
});

test("Test notFound content", () => {
  render(<NotFound />);

  const notFoundElement = screen.getByText(/page not found!/i);

  expect(notFoundElement).toBeInTheDocument();
});

/* Won't work
test("Test data logic 'reverseNominatim'", () => {
  render(<Data />);
  const inputLat = screen.getByLabelText('inputLat')
  const inputLon = screen.getByLabelText('inputLon')

  fireEvent.change(inputLat, { target: { value: '52.388261' } })
  fireEvent.change(inputLon, { target: { value: '13.222992' } })
  expect(input.value).toBe('52.388261')
  expect(input.value).toBe('13.222992')

  fireEvent.click(screen.getByTestId("nominatimReverseButton"))

  expect(screen.getByText(/mühlenstraße/i)).toBeInTheDocument()
});
*/
