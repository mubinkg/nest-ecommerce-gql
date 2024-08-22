export const getHotDeals = (limit:number, offset:number)=> [
    {
      $match: {
        status: "active",
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "product",
        foreignField: "_id",
        as: "product",
        pipeline: [
          {
            $lookup: {
              from: "productvariants",
              localField: "_id",
              foreignField: "product",
              as: "productvariants",
            },
          },
        ],
      },
    },
    {
      $set: {
        product: {
          $arrayElemAt: ["$product", 0],
        },
      },
    },
    {
        $limit: limit
    },
    {
        $skip: offset
    },
  ]