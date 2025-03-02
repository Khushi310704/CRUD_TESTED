import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter } from "react-router-dom";  // ✅ Keep this import
import UserDetails from "../components/UserDetails";
import { fetchUserRequest } from "../redux/userSlice";

// Mock Redux store
const mockStore = configureStore([]);

// ✅ Mock only `useParams` and `Link`, but NOT `BrowserRouter`
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useParams: () => ({ id: "1" }),
    Link: ({ children }) => <div>{children}</div>,
  };
});

test("dispatches fetchUserRequest on mount", () => {
  const store = mockStore({
    users: { selectedUser: null, loading: true, error: null },
  });

  render(
    <Provider store={store}>
      <BrowserRouter>
        <UserDetails />
      </BrowserRouter>
    </Provider>
  );

  expect(store.getActions()).toContainEqual(fetchUserRequest("1"));
});
