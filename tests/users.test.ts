import { render, screen } from "@testing-library/react";
import AdminUsers from "../app/(logged-in)/Admin-account/users/page";
import "@testing-library/jest-dom";


test("AdminUsers page renders correctly", async () => {
  render(await AdminUsers());

  expect(screen.getByText("User Management")).toBeInTheDocument();
});


