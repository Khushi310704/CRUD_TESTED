import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter } from "react-router-dom";
import AddUser from "../components/AddUser";
import { describe, expect, test } from "vitest";

const mockStore = configureStore([]);
const store = mockStore({});

test("renders add user form", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <AddUser />
      </BrowserRouter>
    </Provider>
  );

  expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Phone")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Website")).toBeInTheDocument();
});

describe("Checking input onChange events",() => {
  
  test("Checking for name change",() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AddUser />
        </BrowserRouter>
      </Provider>
    );

    const nameInput = screen.getByPlaceholderText("Name");
    const phoneInput = screen.getByPlaceholderText("Phone");
    const websiteInput = screen.getByPlaceholderText("Website");
    const emailInput = screen.getByPlaceholderText("Email");
    
    fireEvent.change(nameInput, { target: { value: "john Doe"}});
    fireEvent.change(emailInput, { target : { value: "example123@gmail.com"}});
    fireEvent.change(phoneInput, { target : { value: "1234567890"}});
    fireEvent.change(websiteInput, { target : { value : "www.example.com"}});
    
    expect(phoneInput.value).toBe("1234567890");
    expect(nameInput.value).toBe("john Doe");
    expect(emailInput.value).toBe("example123@gmail.com");
    expect(websiteInput.value).toBe("www.example.com");
  });
})