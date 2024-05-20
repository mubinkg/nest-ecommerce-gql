export const getStock = [
    {
      $match: {
        productType: {
          $ne: "digital",
        },
      },
    },
    {
      $lookup: {
        from: "productattributevalues",
        localField: "attributeValues",
        foreignField: "_id",
        as: "attributeValues",
        pipeline: [
          {
            $project: {
              valueName: 1,
            },
          },
        ],
      },
    },
    {
      $group: {
        _id: "$product",
        values: {
          $push: "$$ROOT",
        },
        product: {
          $first: "$product",
        },
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
            $project: {
              pro_input_name: 1,
              category: 1,
            },
          },
        ],
      },
    },
    {
      $project: {
        values: 1,
        product: {
          $arrayElemAt: ["$product", 0],
        },
      },
    },
  ]