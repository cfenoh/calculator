import React from "react";
import TipForm from "../TipForm/TipForm";

import { render, screen } from "../../setupTests";
import tip from "../../components/Tips/Tip";
describe("Tip Form", () => {
  test("should render tip form with all fields initialized with their default values", () => {
    // Total (Tax included), Apply Tip before/after
    render(<TipForm />);
    expect(screen.getByText(/heading/i)).toBeInTheDocument();
    expect(screen.getByText(/qc/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/price/i)).toHaveValue(0);
    expect(screen.getByLabelText(/service/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/service/i)).toHaveValue("1");
    // Related suggested tip is checked by default
    expect(
      screen.getByRole("radio", {
        name: "12",
      })
    ).toBeChecked();

    expect(
      screen.getByRole("listitem", {
        name: /tax/i,
      })
    ).toHaveTextContent("0.00");

    expect(
      screen.getByRole("listitem", {
        name: /tip/i,
      })
    ).toHaveTextContent("0.00");

    expect(screen.getByTitle("total")).toHaveTextContent("0.00");
  });
  describe("By default", () => {
    test(
      "should render tip form with all fields initialized with their default values"
    );
    describe("When user enter an amount", () => {
      test("should not affect the total if amount is 0 or Not a number");
      test("should update the total and total details(taxes, tips)");
    });

    describe("When user changes the language", () => {
      test("the content language changes");
    });

    describe("When user changes the province", () => {
      // should change the price
      test("the taxes changes and the total is updated");
    });
    describe("When user changes the service", () => {
      test(
        "a new list of tips is displayed and by default a suggested amount is selected"
      );
      test("the total is updated based on user selection");
    });
    describe("When user ask for applying tip before taxes", () => {
      test("the total is updated based on user selection");
    });
    describe("When user ask for applying tip after taxes", () => {
      test("the total is updated based on user selection");
    });
  });
});
