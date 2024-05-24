import { convertToObjectId } from "src/utils/convert-to-objectid";

export const sellerOrderCount =(sellerId:string)=> [
    {
      $unwind: {
        path: "$product_variants",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "productvariants",
        localField: "product_variants",
        foreignField: "_id",
        as: "product_variants",
      },
    },
    {
      $project: {
        product_variants: {
          $arrayElemAt: ["$product_variants", 0],
        },
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
          from: "products",
          localField: "product_variants.product",
          foreignField: "_id",
          as: "product",
        },
    },
    {
      $set:
        /**
         * field: The field name
         * expression: The expression.
         */
        {
          product: {
            $arrayElemAt: ["$product", 0],
          },
        },
    },
    {
      $project:
        /**
         * specifications: The fields to
         *   include or exclude.
         */
        {
          seller: "$product.seller",
        },
    },
    {
      $match:
        /**
         * query: The query in MQL.
         */
        {
          seller: convertToObjectId(
            sellerId
          ),
        },
    },
    {
      $group:
        /**
         * _id: The id of the group.
         * fieldN: The first field name.
         */
        {
          _id: "seller",
          total: {
            $sum: 1,
          },
        },
    },
  ]