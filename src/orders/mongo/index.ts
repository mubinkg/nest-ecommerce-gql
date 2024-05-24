import { convertToObjectId } from "src/utils/convert-to-objectid";

export const sellerOrderCount = (sellerId: string) => [
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
    {
      from: "products",
      localField: "product_variants.product",
      foreignField: "_id",
      as: "product",
    },
  },
  {
    $set:
    {
      product: {
        $arrayElemAt: ["$product", 0],
      },
    },
  },
  {
    $project:
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

export const salesReportQuery = (seller: string, limit: number, offset: number, isCount: boolean) => {
  const query:any = [
    {
      $lookup: {
        from: "productvariants",
        localField: "product_variants",
        foreignField: "_id",
        as: "product_variants",
        pipeline: [
          {
            $lookup: {
              from: "products",
              localField: "product",
              foreignField: "_id",
              as: "product",
              pipeline: [
                {
                  $match: {
                    seller: convertToObjectId(seller)
                  },
                },
                {
                  $lookup: {
                    from: "sellers",
                    localField: "seller",
                    foreignField: "_id",
                    as: "seller",
                  },
                },
                {
                  $set: {
                    seller: {
                      $arrayElemAt: ["$seller", 0],
                    },
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
        ],
      },
    },
    {
      $limit: limit,
    },
    {
      $skip: offset,
    },
  ]
  if (isCount) {
    query.pop();
    query.pop();
    query.push({
      "$group":
        {
          _id: null,
          count: {
            $sum: 1,
          },
        },
    })
  }
  return query
}