// __tests__/PaymentsPage.test.tsx

import { render, screen } from "@testing-library/react";
import PaymentsPage from "./page";
import "@testing-library/jest-dom";

describe("PaymentsPage", () => {
  it("renders the payment form with all fields", () => {
    render(<PaymentsPage />);

    expect(screen.getByText("Payment Form")).toBeInTheDocument();

    expect(screen.getByLabelText("Name on Card")).toBeInTheDocument();
    expect(screen.getByLabelText("Card Number")).toBeInTheDocument();
    expect(screen.getByLabelText("Expiry Date")).toBeInTheDocument();
    expect(screen.getByLabelText("CVV")).toBeInTheDocument();
    expect(screen.getByLabelText("Amount")).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "Pay Now" })).toBeInTheDocument();
  });
});