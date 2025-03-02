import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NavBar from "../components/NavBar";

test("renders navigation links", () => {
  render(
    <BrowserRouter>
      <NavBar />
    </BrowserRouter>
  );

  expect(screen.getByText("User Management")).toBeInTheDocument();
});
