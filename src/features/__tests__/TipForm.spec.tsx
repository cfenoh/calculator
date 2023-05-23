import React from "react";
import {
  render,
  screen,
  userEvent,
  act,
  fireEvent,
  waitFor,
} from "../../setupTests";
import TipForm from "../TipForm/TipForm";
import {
  defaultSuggestedTipIsChecked,
  getTaxAmount,
  getTipAmount,
  listItemByName,
  provinces,
  relatedTipsAreDisplayed,
  services,
} from "./util";

describe("Tip Form", () => {
  beforeEach(() => {
    vi.mock("react-i18next", () => {
      return {
        useTranslation: () => ({
          t: vi.fn().mockImplementation((key: string) => key),
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
    await waitFor(async () => {
      expect(screen.getByText(/heading/i)).toBeInTheDocument();
      expect(screen.getByText(/on/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/price/i)).toHaveValue(null);
      expect(screen.getByLabelText(/service.label/i)).toHaveValue("1");
      // Related suggested tip is checked by default
      relatedTipsAreDisplayed(["10", "12", "15"]);
      defaultSuggestedTipIsChecked("12");
      expect(
        screen.getByRole("checkbox", {
          name: /shouldApplyTipBeforeTax/i,
        })
      ).not.toBeChecked();
      expect(listItemByName("tax")).toHaveTextContent("0.00");
      expect(listItemByName("tip")).toHaveTextContent("0.00");
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
          expect(listItemByName("tax")).toHaveTextContent("0.00");
          expect(listItemByName("tip")).toHaveTextContent("0.00");
          expect(screen.getByTitle("total")).toHaveTextContent("0.00");
        });
      });
      test("should update the total and total details(taxes, tips)", async () => {
        await act(() => {
          fireEvent.change(screen.getByLabelText(/price.label/i), {
            target: { value: 10 },
          });
        });

        await waitFor(() => {
          expect(getTaxAmount()).toHaveTextContent("1.30");
          expect(getTipAmount()).toHaveTextContent("1.36");
          expect(screen.getByTitle("total")).toHaveTextContent("12.66");
        });
      });
    });

    describe("When user changes the province", () => {
      test("the taxes changes and the total is updated", async () => {
        await userEvent.selectOptions(
          screen.getByRole("combobox", { name: /provinceId/i }),
          screen.getByRole("option", { name: /qc/i })
        );
        expect(
          screen.getByRole("combobox", { name: /provinceId/i })
        ).toHaveDisplayValue("QC");

        const priceInput = screen.getByLabelText(/price.label/i);
        fireEvent.change(priceInput, { target: { value: "10" } });

        expect(getTaxAmount()).toHaveTextContent("1.50");

        expect(getTipAmount()).toHaveTextContent("1.38");
        expect(screen.getByTitle("total")).toHaveTextContent("12.88");
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
          expect(screen.getByTitle("total")).toHaveTextContent("12.66");
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
            screen.getByRole("button", { name: /1 \$/i })
          ).toBeInTheDocument();
          expect(screen.getByRole("button", { name: /1.5 \$/i })).toBeActive();
          expect(
            screen.getByRole("button", { name: /2 \$/i })
          ).toBeInTheDocument();

          expect(getTaxAmount()).toHaveTextContent("1.30");
          expect(getTipAmount()).toHaveTextContent("1.5");
          expect(screen.getByTitle("total")).toHaveTextContent("12.80");
        });
      });
    });
    describe("When user ask for applying tip after taxes", () => {
      test("the total is updated based on user selection", async () => {
        fireEvent.change(screen.getByLabelText(/price.label/i), {
          target: { value: 12 },
        });
        expect(screen.getByTitle("total")).toHaveTextContent("15.19");

        await userEvent.selectOptions(
          screen.getByRole("combobox", { name: /service.label/i }),
          screen.getByRole("option", { name: /Coffee shop/i })
        );
        expect(
          screen.getByRole("combobox", { name: /service.label/i })
        ).toHaveDisplayValue("Coffee shop");

        expect(
          screen.getByRole("button", { name: /1 \$/i })
        ).toBeInTheDocument();
        expect(
          screen.getByRole("button", { name: /1.5/i })
        ).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /1.5/i })).toBeActive();
        expect(screen.getByRole("button", { name: /2/i })).toBeInTheDocument();

        await userEvent.selectOptions(
          screen.getByRole("combobox", { name: /service.label/i }),
          screen.getByRole("option", { name: /Fast food/i })
        );
        expect(
          screen.getByRole("combobox", { name: /service.label/i })
        ).toHaveDisplayValue("Fast food");

        expect(screen.getByRole("button", { name: /10/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /12/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /12/i })).toBeActive();
        expect(screen.getByRole("button", { name: /15/i })).toBeInTheDocument();

        await userEvent.click(screen.getByRole("button", { name: /15/i }));
        expect(getTaxAmount()).toHaveTextContent("1.56");

        expect(getTipAmount()).toHaveTextContent("2.03");
        expect(screen.getByTitle("total")).toHaveTextContent("15.59");

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
        expect(getTipAmount()).toHaveTextContent("1.80");
        expect(screen.getByTitle("total")).toHaveTextContent("15.36");
      });
    });

    test("should allow only number in price field", () => {
      fireEvent.change(screen.getByLabelText(/price.label/i), {
        target: { value: "abcd" },
      });
      expect(screen.getByLabelText(/price.label/i)).toHaveValue(null);

      fireEvent.change(screen.getByLabelText(/price.label/i), {
        target: { value: "e" },
      });
      expect(screen.getByLabelText(/price.label/i)).toHaveValue(null);

      fireEvent.change(screen.getByLabelText(/price.label/i), {
        target: { value: 12.9 },
      });
      expect(screen.getByLabelText(/price.label/i)).toHaveValue(12.9);

      fireEvent.change(screen.getByLabelText(/price.label/i), {
        target: { value: "12,9" },
      });
      expect(screen.getByLabelText(/price.label/i)).toHaveValue(null);
    });

    test("should clear price input when user types if the current field value is 0", () => {
      fireEvent.change(screen.getByLabelText(/price.label/i), {
        target: { value: "019" },
      });
      expect(screen.getByLabelText(/price.label/i)).toHaveValue(19);
    });

    test("user should be able see the taxes amount and percentage", () => {
      fireEvent.change(screen.getByLabelText(/price.label/i), {
        target: { value: "019" },
      });

      expect(screen.getByTitle("tax-amount")).toBeInTheDocument();
      expect(screen.getByTitle("tax-amount")).toHaveTextContent("2.47");

      expect(screen.getByTitle("province-taxes")).toBeInTheDocument();
      expect(screen.getByTitle("province-taxes")).toHaveTextContent("(13.00%)");
    });

    test.skip("user should be able to customize tip amount then total is updated", () => {
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
          screen.getByRole("combobox", { name: /service.label/i }),
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
