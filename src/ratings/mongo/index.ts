export const toalRatingQuery = [
    {
      $group:
        {
          _id: null,
          total: {
            $sum: "$rating",
          },
        },
    },
  ]