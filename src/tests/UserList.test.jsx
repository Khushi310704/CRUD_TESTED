import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter } from "react-router-dom";
import UserList from "../components/UserList";

const mockStore = configureStore([]);

test("renders user list table", () => {
  const store = mockStore({
    users: { users: [{ id: 1, name: "John Doe", email: "john@example.com" }] },
  });

  render(
    <Provider store={store}>
      <BrowserRouter>
        <UserList />
      </BrowserRouter>
    </Provider>
  );

  expect(screen.getByText("John Doe")).toBeInTheDocument();
});
