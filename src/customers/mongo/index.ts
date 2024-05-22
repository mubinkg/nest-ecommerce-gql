export const allCustomerWalletAmountQuery = [
    {
      $group:
        /**
         * _id: The id of the group.
         * fieldN: The first field name.
         */
        {
          _id: null,
          total: {
            $sum: "$wallet_amount",
          },
        },
    },
  ]