export const getAttributeSetValues = [
    {
      $lookup: {
        from: "productattributes",
        localField: "_id",
        foreignField: "attributeSet",
        as: "attributes",
        pipeline: [
          {
            $lookup: {
              from: "productattributevalues",
              localField: "_id",
              foreignField: "productAttribute",
              as: "productAttributes",
            },
          },
        ],
      },
    },
  ]