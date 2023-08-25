import { Service } from "../tip.types";

export const serviceList: Service[] = [
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
    label: "Sit-down restaurant",
    unit: "percentage",
    tips: [
      {
        rating: "🙂",
        value: 15,
        ratingText: "Good",
        isSuggested: false,
        unit: "percentage",
      },
      {
        rating: "😊",
        value: 18,
        ratingText: "Great",
        isSuggested: true,
        unit: "percentage",
      },
      {
        rating: "🤩",
        value: 20,
        ratingText: "Excellent",
        isSuggested: false,
        unit: "percentage",
      },
    ],
    id: 2,
    transKey: "sit-down-restaurant",
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
  {
    category: "Food service",
    label: "Delivery",
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
    id: 4,
    transKey: "delivery",
  },
  {
    category: "Food service",
    label: "Bartender",
    unit: "dollar",
    note: "per drink",
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
    id: 5,
    transKey: "bartender",
  },
  {
    category: "Personal care",
    label: "Haircut",
    unit: "percentage",
    tips: [
      {
        rating: "🙂",
        value: 15,
        ratingText: "Good",
        isSuggested: true,
        unit: "percentage",
      },
      {
        rating: "😊",
        value: 18,
        ratingText: "Great",
        isSuggested: false,
        unit: "percentage",
      },
      {
        rating: "🤩",
        value: 20,
        ratingText: "Excellent",
        isSuggested: false,
        unit: "percentage",
      },
    ],
    id: 6,
    transKey: "haircut",
  },
  {
    category: "Personal care",
    label: "Manicure/pedicure",
    unit: "percentage",
    tips: [
      {
        rating: "🙂",
        value: 15,
        ratingText: "Good",
        isSuggested: false,
        unit: "percentage",
      },
      {
        rating: "😊",
        value: 18,
        ratingText: "Great",
        isSuggested: true,
        unit: "percentage",
      },
      {
        rating: "🤩",
        value: 20,
        ratingText: "Excellent",
        isSuggested: false,
        unit: "percentage",
      },
    ],
    id: 7,
    transKey: "manicure/pedicure",
  },
  {
    category: "Personal care",
    label: "Massage",
    unit: "percentage",
    tips: [
      {
        rating: "🙂",
        value: 15,
        ratingText: "Good",
        isSuggested: false,
        unit: "percentage",
      },
      {
        rating: "😊",
        value: 18,
        ratingText: "Great",
        isSuggested: true,
        unit: "percentage",
      },
      {
        rating: "🤩",
        value: 20,
        ratingText: "Excellent",
        isSuggested: false,
        unit: "percentage",
      },
    ],
    id: 8,
    transKey: "massage",
  },
  {
    category: "Transportation",
    label: "Taxi",
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
    id: 9,
    transKey: "taxi",
  },
  {
    category: "Hotel",
    label: "Bellhop",
    unit: "dollar",
    note: "per bag",
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
    id: 10,
    transKey: "bellhop",
  },
  {
    category: "Hotel",
    label: "Housekeeping",
    unit: "dollar",
    note: "per night",
    tips: [
      {
        rating: "🙂",
        value: 2,
        ratingText: "Good",
        isSuggested: false,
        unit: "dollar",
      },
      {
        rating: "😊",
        value: 3.5,
        ratingText: "Great",
        isSuggested: true,
        unit: "dollar",
      },
      {
        rating: "🤩",
        value: 5,
        ratingText: "Excellent",
        isSuggested: false,
        unit: "dollar",
      },
    ],
    id: 11,
    transKey: "housekeeping",
  },
  {
    category: "Miscellaneous",
    label: "Coat check",
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
    id: 12,
    transKey: "coat-check",
  },
  {
    category: "Miscellaneous",
    label: "Musician",
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
        value: 3.5,
        ratingText: "Great",
        isSuggested: true,
        unit: "dollar",
      },
      {
        rating: "🤩",
        value: 5,
        ratingText: "Excellent",
        isSuggested: false,
        unit: "dollar",
      },
    ],
    id: 13,
    transKey: "musician",
  },
  {
    category: "Miscellaneous",
    label: "Valet",
    unit: "dollar",
    tips: [
      {
        rating: "🙂",
        value: 2,
        ratingText: "Good",
        isSuggested: false,
        unit: "dollar",
      },
      {
        rating: "😊",
        value: 3.5,
        ratingText: "Great",
        isSuggested: true,
        unit: "dollar",
      },
      {
        rating: "🤩",
        value: 5,
        ratingText: "Excellent",
        isSuggested: false,
        unit: "dollar",
      },
    ],
    id: 14,
    transKey: "valet",
  },
];