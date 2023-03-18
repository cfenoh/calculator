import React from "react";
import { render, screen, userEvent } from "../../setupTests";
import { act, fireEvent, waitFor } from "@testing-library/react";
import TipForm from "../TipForm/TipForm";

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
        unit: "percentage",
      },
      {
        rating: "😊",
        value: 12,
        ratingText: "Great",
        isSuggested: true,
        unit: "percentage",
      },
      {
        rating: "🤩",
        value: 15,
        ratingText: "Excellent",
        isSuggested: false,
        unit: "percentage",
      },
    ],
    id: 1,
    transKey: "fast-food",
  },
  {
    category: "Food service",
    label: "Coffee shop",
    unit: "dollar",
    tips: [
      {
        rating: "🙂",
        value: 1,
        ratingText: "Good",
        isSuggested: false,
        unit: "dollar",
      },
      {
        rating: "😊",
        value: 1.5,
        ratingText: "Great",
        isSuggested: true,
        unit: "dollar",
      },
      {
        rating: "🤩",
        value: 2,
        ratingText: "Excellent",
        isSuggested: false,
        unit: "dollar",
      },
    ],
    id: 3,
    transKey: "coffee-shop",
  },
];
describe("Tip Form", () => {
  beforeEach(() => {
    vi.mock("react-i18next", () => {
      return {
        useTranslation: () => ({
          t: vi.fn().mockImplementation((key) => key),
        }),
      };
    });
    act(() => {
      render(<TipForm services={services} provinces={provinces} />);
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });
  test("should render tip form with all fields initialized with their default values", async () => {
    await waitFor(() => {
      expect(screen.getByText(/heading/i)).toBeInTheDocument();
      expect(screen.getByText(/qc/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/price/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/price/i)).toHaveValue(0);
      expect(screen.getByLabelText(/service.label/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/service.label/i)).toHaveValue("1");
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
  });

  describe("By default", () => {
    describe("When user enter an amount", () => {
      test("should not affect the total if amount is 0 or Not a number", async () => {
        await act(() => {
          userEvent.type(screen.getByLabelText(/price/i), "10");
        });
        await waitFor(() => {
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
      });
      test("should update the total and total details(taxes, tips)", async () => {
        await waitFor(() => {
          const priceInput = screen.getByLabelText(/price.label/i);

          fireEvent.change(priceInput, { target: { value: 10 } });
          expect(priceInput).toHaveValue(10);
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
    });

    describe("When user changes the province", () => {
      test("the taxes changes and the total is updated", async () => {
        await userEvent.selectOptions(
          screen.getByRole("combobox", { name: /provinceId/i }),
          screen.getByRole("option", { name: /on/i })
        );
        expect(
          screen.getByRole("combobox", { name: /provinceId/i })
        ).toHaveDisplayValue("ON");

        const priceInput = screen.getByLabelText(/price.label/i);
        fireEvent.change(priceInput, { target: { value: "10" } });

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
        expect(
          screen.getByRole("checkbox", {
            name: /shouldApplyTipBeforeTax/i,
          })
        ).not.toBeChecked();
      });
    });

    describe("When user changes the service", () => {
      test("a new list of tips is displayed and by default a suggested amount is selected and total is updated", async () => {
        await act(() => {
          fireEvent.change(screen.getByLabelText(/price.label/i), {
            target: { value: 10 },
          });
        });

        await waitFor(() => {
          expect(screen.getByTitle("total")).toHaveTextContent("12.88");
        });

        await userEvent.selectOptions(
          screen.getByRole("combobox", { name: /service.label/i }),
          screen.getByRole("option", { name: /Coffee shop/i })
        );
        await waitFor(() => {
          expect(
            screen.getByRole("combobox", { name: /service.label/i })
          ).toHaveDisplayValue("Coffee shop");
          expect(
            screen.getByRole("radio", { name: "1 $" })
          ).toBeInTheDocument();
          expect(
            screen.getByRole("radio", { name: /1.5/i })
          ).toBeInTheDocument();
          expect(screen.getByRole("radio", { name: /1.5/i })).toBeChecked();
          expect(screen.getByRole("radio", { name: /2/i })).toBeInTheDocument();
          expect(
            screen.getByRole("listitem", {
              name: /tax/i,
            })
          ).toHaveTextContent("1.50");

          expect(screen.getByTitle("computed-tip")).toHaveTextContent("1.5");
          expect(screen.getByTitle("total")).toHaveTextContent("13");
          expect(
            screen.getByRole("checkbox", {
              name: /shouldApplyTipBeforeTax/i,
            })
          ).not.toBeChecked();
        });
      });
    });
    describe("When user ask for applying tip after taxes", () => {
      test("the total is updated based on user selection", async () => {
        fireEvent.change(screen.getByLabelText(/price.label/i), {
          target: { value: 12 },
        });
        expect(screen.getByTitle("total")).toHaveTextContent("15.45");

        await userEvent.selectOptions(
          screen.getByRole("combobox", { name: /service.label/i }),
          screen.getByRole("option", { name: /Coffee shop/i })
        );
        expect(
          screen.getByRole("combobox", { name: /service.label/i })
        ).toHaveDisplayValue("Coffee shop");

        expect(screen.getByRole("radio", { name: "1 $" })).toBeInTheDocument();
        expect(screen.getByRole("radio", { name: /1.5/i })).toBeInTheDocument();
        expect(screen.getByRole("radio", { name: /1.5/i })).toBeChecked();
        expect(screen.getByRole("radio", { name: /2/i })).toBeInTheDocument();

        await userEvent.selectOptions(
          screen.getByRole("combobox", { name: /service.label/i }),
          screen.getByRole("option", { name: /Fast food/i })
        );
        expect(
          screen.getByRole("combobox", { name: /service.label/i })
        ).toHaveDisplayValue("Fast food");

        expect(screen.getByRole("radio", { name: /10/i })).toBeInTheDocument();
        expect(screen.getByRole("radio", { name: /12/i })).toBeInTheDocument();
        expect(screen.getByRole("radio", { name: /12/i })).toBeChecked();
        expect(screen.getByRole("radio", { name: /15/i })).toBeInTheDocument();

        await userEvent.click(screen.getByRole("radio", { name: /15/i }));
        expect(
          screen.getByRole("listitem", {
            name: /tax/i,
          })
        ).toHaveTextContent("1.80");

        expect(
          screen.getByRole("listitem", {
            name: /tip/i,
          })
        ).toHaveTextContent("2.07");
        expect(screen.getByTitle("total")).toHaveTextContent("15.87");

        await userEvent.click(
          screen.getByRole("checkbox", {
            name: /shouldApplyTipBeforeTax/i,
          })
        );
        expect(
          screen.getByRole("checkbox", {
            name: /shouldApplyTipBeforeTax/i,
          })
        ).toBeChecked();
        expect(
          screen.getByRole("listitem", {
            name: /tip/i,
          })
        ).toHaveTextContent("1.80");
        expect(screen.getByTitle("total")).toHaveTextContent("15.60");
      });
    });

    test("should allow only number in price field", () => {
      fireEvent.change(screen.getByLabelText(/price.label/i), {
        target: { value: "abcd" },
      });
      expect(screen.getByLabelText(/price.label/i)).toHaveValue(0);

      fireEvent.change(screen.getByLabelText(/price.label/i), {
        target: { value: "e" },
      });
      expect(screen.getByLabelText(/price.label/i)).toHaveValue(0);

      fireEvent.change(screen.getByLabelText(/price.label/i), {
        target: { value: 12.9 },
      });
      expect(screen.getByLabelText(/price.label/i)).toHaveValue(12.9);

      fireEvent.change(screen.getByLabelText(/price.label/i), {
        target: { value: "12,9" },
      });
      expect(screen.getByLabelText(/price.label/i)).toHaveValue(12.9);
    });

    test("should clear price input when user types if the current field value is 0", () => {
      fireEvent.change(screen.getByLabelText(/price.label/i), {
        target: { value: "019" },
      });
      expect(screen.getByLabelText(/price.label/i)).toHaveValue("19");
    });

    test("user should be able see the taxes amount and percentage", () => {
      fireEvent.change(screen.getByLabelText(/price.label/i), {
        target: { value: "019" },
      });

      expect(screen.getByTitle("tax-amount")).toBeInTheDocument();
      expect(screen.getByTitle("tax-amount")).toHaveTextContent("2.85");

      expect(screen.getByTitle("province-taxes")).toBeInTheDocument();
      expect(screen.getByTitle("province-taxes")).toHaveTextContent("(14.97%)");
    });

    test("user should be able to customize tip amount then total is updated", () => {
      fireEvent.change(screen.getByLabelText(/price.label/i), {
        target: { value: "019" },
      });

      fireEvent.change(screen.getByRole("spinbutton", { name: "custom-tip" }), {
        target: { value: "09" },
      });
      expect(screen.getByTitle("total")).toHaveTextContent("23.81");
    });

    describe("when tip unit is a percentage", () => {
      test("should display the unit in the tip label and apply the right percentage", () => {
        fireEvent.change(screen.getByLabelText(/price.label/i), {
          target: { value: "010" },
        });

        expect(screen.getByTitle("chosen-tip")).toBeInTheDocument();
        expect(screen.getByTitle("chosen-tip")).toHaveTextContent(/12 %/i);
      });
    });

    describe("when tip unit is a currency", () => {
      test("should display the unit in the tip label and add the tip amount to the total", async () => {
        fireEvent.change(screen.getByLabelText(/price.label/i), {
          target: { value: "010" },
        });
        await userEvent.selectOptions(
          screen.getByRole("combobox", { name: /serviceId/i }),
          screen.getByRole("option", { name: /Coffee shop/i })
        );
        expect(screen.getByTitle("chosen-tip")).toBeInTheDocument();
        expect(screen.getByTitle("chosen-tip")).toHaveTextContent("(1.5 $)");
      });
    });

    describe("When user changes the language", () => {
      test("the content language changes");
    });
  });
});
