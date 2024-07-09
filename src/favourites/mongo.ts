import { convertToObjectId } from "src/utils/convert-to-objectid";

export const getFavoriteProduct = (id:string, limit:number, offset:number)=>[
    {
      $match:
        {
          user: convertToObjectId(
            id
          ),
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
              from: "attributes",
              localField: "_id",
              foreignField: "product",
              as: "attributes",
              pipeline: [
                {
                  $lookup: {
                    from: "productattributevalues",
                    localField: "values",
                    foreignField: "_id",
                    as: "values",
                  },
                },
                {
                  $lookup: {
                    from: "productattributes",
                    localField: "attribute",
                    foreignField: "_id",
                    as: "attribute",
                  },
                },
                {
                  $set: {
                    attribute: {
                      $arrayElemAt: [
                        "$attribute",
                        0,
                      ],
                    },
                  },
                },
              ],
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
            $lookup: {
              from: "categories",
              localField: "category",
              foreignField: "_id",
              as: "category",
            },
          },
          {
            $set: {
              brand: {
                $arrayElemAt: ["$brand", 0],
              },
              category: {
                $arrayElemAt: ["$category", 0],
              },
            },
          },
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
          $arrayElemAt: ["$product", 0]
        }
      }
    },
    {
        $limit: limit
    },
    {
        $skip: offset
    }
  ]