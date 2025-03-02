import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter } from "react-router-dom";
import EditUser from "../components/EditUser";
import { updateUserRequest } from "../redux/userSlice";

// Mock Redux store
const mockStore = configureStore([]);
let store;

// Mock `useNavigate`
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useParams: () => ({ id: "1" }), // Mock user ID
    useNavigate: () => mockNavigate,
  };
});

beforeEach(() => {
  store = mockStore({
    users: {
      users: [
        { id: 1, name: "John Doe", email: "john@example.com", phone: "123456789", website: "john.com" },
      ],
    },
  });
});

test("updates user when form is submitted", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <EditUser />
      </BrowserRouter>
    </Provider>
  );

  const nameInput = screen.getByPlaceholderText("name");
  const emailInput = screen.getByPlaceholderText("email");
  const phoneInput = screen.getByPlaceholderText("phone");
  const websiteInput = screen.getByPlaceholderText("website");
  const updateButton = screen.getByText("Update User");

  // Update all input values
  fireEvent.change(nameInput, { target: { value: "Jane Doe" } });
  fireEvent.change(emailInput, { target: { value: "jane@example.com" } });
  fireEvent.change(phoneInput, { target: { value: "987654321" } });
  fireEvent.change(websiteInput, { target: { value: "jane.com" } });

  // Click update button
  fireEvent.click(updateButton);

  // Extract the dispatched action's payload
  const dispatchedActions = store.getActions();
  const updateAction = dispatchedActions.find(action => action.type === updateUserRequest.type);

  expect(updateAction).toBeDefined(); // Ensure update action is dispatched
  expect(updateAction.payload).toEqual({
    id: 1, 
    name: "Jane Doe", 
    email: "jane@example.com", 
    phone: "987654321", 
    website: "jane.com",
  });

  // Check if navigate was called
  expect(mockNavigate).toHaveBeenCalledWith("/");
});
