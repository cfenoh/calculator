import { screen, within } from "../../setupTests";

export const provinces = [
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

export const services = [
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

export const buttonByName = (buttonName: string): HTMLElement =>
  screen.getByRole("button", { name: new RegExp(buttonName, "i") });

export const listItemByName = (name: string): HTMLElement =>
  screen.getByRole("listitem", { name: new RegExp(name, "i") });

export const relatedTipsAreDisplayed = (relatedTips: string[]) => {
  relatedTips.forEach((tip) => {
    expect(buttonByName(tip)).toBeInTheDocument();
  });
};

export const defaultSuggestedTipIsChecked = (defaultSuggestedTip: string) =>
  expect(buttonByName(defaultSuggestedTip)).toBeActive();

export const getTaxAmount = () =>
  within(listItemByName("tax")).getByTitle("tax-amount");
export const getTipAmount = () =>
  within(listItemByName("tip")).getByTitle("computed-tip");
