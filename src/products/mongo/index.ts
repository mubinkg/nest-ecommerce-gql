export const adminProductQuery:any = [
    {
      $sort:
        {
          _id: -1,
        },
    },
    {
      $lookup:
        /**
         * from: The target collection.
         * localField: The local join field.
         * foreignField: The target join field.
         * as: The name for the results.
         * pipeline: Optional pipeline to run on the foreign collection.
         * let: Optional variables to use in the pipeline field stages.
         */
        {
          from: "productattributes",
          localField: "attributes.attribute",
          foreignField: "_id",
          as: "attributelist",
        },
    },
    {
      $lookup: {
        from: "productattributevalues",
        localField: "attributes.values",
        foreignField: "_id",
        as: "valueList",
      },
    },
    {
      $lookup: {
        from: "brands",
        localField: "brand",
        foreignField: "_id",
        as: "brand",
      },
    },
    {
      $lookup:
        /**
         * from: The target collection.
         * localField: The local join field.
         * foreignField: The target join field.
         * as: The name for the results.
         * pipeline: Optional pipeline to run on the foreign collection.
         * let: Optional variables to use in the pipeline field stages.
         */
        {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
    },
    {
      $set:
        /**
         * field: The field name
         * expression: The expression.
         */
        {
          "attributes.attribute": {
            $arrayElemAt: ["$attributelist", 0],
          },
          brand: {
            $arrayElemAt: ["$brand", 0],
          },
          category: {
            $arrayElemAt: ["$category", 0],
          },
          "attributes.values": "$valueList",
        },
    },
    {
      $unset: ["valueList", "attributelist"],
    },
    {
      $lookup:
        /**
         * from: The target collection.
         * localField: The local join field.
         * foreignField: The target join field.
         * as: The name for the results.
         * pipeline: Optional pipeline to run on the foreign collection.
         * let: Optional variables to use in the pipeline field stages.
         */
        {
          from: "productvariants",
          localField: "_id",
          foreignField: "product",
          as: "productvariants",
        },
    },
  ]