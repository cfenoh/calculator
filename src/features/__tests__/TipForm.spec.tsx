import React from "react";
import TipForm from "../TipForm/TipForm";
import { render, screen, userEvent } from "../../setupTests";
import { fireEvent } from "@testing-library/react";

const provinces = [
  {
    id: 5,
    name: "Ontario",
    value: 13,
    shortName: "ON",
  },
  {
    id: 6,
    name: "Quebec",
    value: 14.975,
    shortName: "QC",
  },
];

const services = [
  {
    category: "Food service",
    label: "Fast food",
    unit: "percentage",
    tips: [
      {
        rating: "🙂",
        value: 10,
        ratingText: "Good",
        isSuggested: false,
      },
      {
        rating: "😊",
        value: 12,
        ratingText: "Great",
        isSuggested: true,
      },
      {
        rating: "🤩",
        value: 15,
        ratingText: "Excellent",
        isSuggested: false,
      },
    ],
    id: 1,
    transKey: "fast-food",
  },
  {
    category: "Food service",
    label: "Sit-down restaurant",
    unit: "percentage",
    tips: [
      {
        rating: "🙂",
        value: 15,
        ratingText: "Good",
        isSuggested: false,
      },
      {
        rating: "😊",
        value: 18,
        ratingText: "Great",
        isSuggested: true,
      },
      {
        rating: "🤩",
        value: 20,
        ratingText: "Excellent",
        isSuggested: false,
      },
    ],
    id: 2,
    transKey: "sit-down-restaurant",
  },
];
describe("Tip Form", () => {
  beforeEach(() => {
    render(<TipForm services={services} provinces={provinces} />);
  });
  test("should render tip form with all fields initialized with their default values", () => {
    expect(screen.getByText(/heading/i)).toBeInTheDocument();
    expect(screen.getByText(/qc/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/price/i)).toHaveValue("0");
    expect(screen.getByLabelText(/service/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/service/i)).toHaveValue("1");
    // Related suggested tip is checked by default
    expect(screen.getByRole("radio", { name: /10/i })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: /12/i })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: /12/i })).toBeChecked();
    expect(screen.getByRole("radio", { name: /15/i })).toBeInTheDocument();
    expect(
      screen.getByRole("checkbox", {
        name: /shouldApplyTipBeforeTax/i,
      })
    ).not.toBeChecked();
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
    describe("When user enter an amount", () => {
      test("should not affect the total if amount is 0 or Not a number", () => {
        userEvent.type(screen.getByLabelText(/price/i), "10");
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
      test("should update the total and total details(taxes, tips)", () => {
        const priceInput = screen.getByLabelText(/price.label/i);

        fireEvent.change(priceInput, { target: { value: "10" } });
        expect(priceInput).toHaveValue("10");
        expect(
          screen.getByRole("listitem", {
            name: /tax/i,
          })
        ).toHaveTextContent("1.50");

        expect(
          screen.getByRole("listitem", {
            name: /tip/i,
          })
        ).toHaveTextContent("1.38");
        expect(screen.getByTitle("total")).toHaveTextContent("12.88");
      });
    });

    describe("When user changes the province", () => {
      test("the taxes changes and the total is updated", async () => {
        await userEvent.selectOptions(
          screen.getByRole("combobox", { name: /province/i }),
          screen.getByRole("option", { name: /on/i })
        );
        expect(
          screen.getByRole("combobox", { name: /province/i })
        ).toHaveDisplayValue("ON");

        const priceInput = screen.getByLabelText(/price.label/i);
        fireEvent.change(priceInput, { target: { value: 10 } });

        expect(
          screen.getByRole("listitem", {
            name: /tax/i,
          })
        ).toHaveTextContent("1.30");

        expect(
          screen.getByRole("listitem", {
            name: /tip/i,
          })
        ).toHaveTextContent("1.36");
        expect(screen.getByTitle("total")).toHaveTextContent("12.66");
      });
    });

    describe("When user changes the service", () => {
      test("a new list of tips is displayed and by default a suggested amount is selected and total is updated", async () => {
        fireEvent.change(screen.getByLabelText(/price.label/i), {
          target: { value: 10 },
        });
        expect(screen.getByTitle("total")).toHaveTextContent("12.88");

        await userEvent.selectOptions(
          screen.getByRole("combobox", { name: /service/i }),
          screen.getByRole("option", { name: /Sit-down restaurant/i })
        );
        expect(
          screen.getByRole("combobox", { name: /service/i })
        ).toHaveDisplayValue("Sit-down restaurant");

        expect(screen.getByRole("radio", { name: /15/i })).toBeInTheDocument();
        expect(screen.getByRole("radio", { name: /18/i })).toBeInTheDocument();
        expect(screen.getByRole("radio", { name: /18/i })).toBeChecked();
        expect(screen.getByRole("radio", { name: /20/i })).toBeInTheDocument();
        expect(
          screen.getByRole("listitem", {
            name: /tax/i,
          })
        ).toHaveTextContent("1.50");

        expect(
          screen.getByRole("listitem", {
            name: /tip/i,
          })
        ).toHaveTextContent("2.07");
        expect(screen.getByTitle("total")).toHaveTextContent("13.57");
      });
    });
    describe("When user ask for applying tip before taxes", () => {
      test("the total is updated based on user selection");
    });
    describe("When user ask for applying tip after taxes", () => {
      test("the total is updated based on user selection");
    });

    describe("When user changes the language", () => {
      test("the content language changes");
    });
  });
});
