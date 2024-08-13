import { convertToObjectId } from "src/utils/convert-to-objectid";

export const getCart = (userId:string)=> [
    {
      $match: {
        user: convertToObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "productvariants",
        localField: "product_variant",
        foreignField: "_id",
        as: "product_variant",
      },
    },
    {
      $set: {
        product_variant: {
          $arrayElemAt: ["$product_variant", 0],
        },
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "product_variant.product",
        foreignField: "_id",
        as: "product",
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
      $lookup: {
        from: "productattributevalues",
        localField: "product_variant.attributeValues",
        foreignField: "_id",
        as: "attribute_values",
      },
    },
  ]