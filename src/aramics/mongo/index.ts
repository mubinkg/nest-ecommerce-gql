const getCharge = ()=>[
    {
      $match:
        /**
         * query: The query in MQL.
         */
        {
          eramicsCountryName: "UAE"
        }
    },
    {
      $sort:
        /**
         * Provide any number of field/order pairs.
         */
        {
          weight: 1
        }
    },
    {
      $match:
        /**
         * query: The query in MQL.
         */
        {
          weight: {
            $gte: "9"
          }
        }
    },
    {
      $group:
        /**
         * _id: The id of the group.
         * fieldN: The first field name.
         */
        {
          _id: null,
          fieldN: {
            $first: "$weight"
          }
        }
    }
  ]