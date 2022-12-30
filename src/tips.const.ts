export const TIPS_BY_SERVICE = {
  all: [
    { rating: "😐", value: 10, ratingText: "Normal", recommended: false },
    {
      rating: "🙂",
      value: 15,
      ratingText: "Good",
      recommended: true,
    },
    {
      rating: "😊",
      value: 18,
      ratingText: "Great",
      recommended: false,
    },
    {
      rating: "🤩",
      value: 20,
      ratingText: "Excellent",
      recommended: false,
    },
  ],
} as const;
