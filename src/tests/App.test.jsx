import { render, screen, within } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import AddUser from "../components/AddUser";

const mockStore = configureStore([]);
const store = mockStore({
  users: {
    users: [],
    loading: false,
    error: null,
  },
});

test("renders AddUser page", () => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/add"]}>
        <Routes>
          <Route path="/add" element={<AddUser />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );

  // Ensure "Add User" heading exists
  const addUserHeading = screen.getByRole("heading", { name: /add user/i });
  expect(addUserHeading).toBeInTheDocument();

  // Find the form using data-testid
  const form = screen.getByTestId("user-form");
  expect(form).toBeInTheDocument();

  // Ensure input fields exist within the form
  expect(within(form).getByPlaceholderText(/name/i)).toBeInTheDocument();
  expect(within(form).getByPlaceholderText(/email/i)).toBeInTheDocument();
  expect(within(form).getByPlaceholderText(/phone/i)).toBeInTheDocument();
  expect(within(form).getByPlaceholderText(/website/i)).toBeInTheDocument();

  // Ensure the submit button exists
  expect(screen.getByRole("button", { name: /add user/i })).toBeInTheDocument();
});
