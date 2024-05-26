import { convertToObjectId } from "src/utils/convert-to-objectid"
import { GetProductDto } from "../dto/get-products.dto"

export const adminProductQuery:any = [
    {
      $sort:
        {
          _id: -1,
        },
    },
    {
      $lookup:
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
        {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
    },
    {
      $set:
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
        {
          from: "productvariants",
          localField: "_id",
          foreignField: "product",
          as: "productvariants",
        },
    },
  ]

export const categoryWiseSellerProduct = (sellerId:string) => [
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
        _id: "$category",
        count: {
          $sum: 1,
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
        from: "categories",
        localField: "_id",
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
        category: {
          $arrayElemAt: ["$category", 0],
        },
      },
  },
]

export const getProductsQuery = (getProductInputDto:GetProductDto)=>{
  const {category_id, search, tags, attribute_value_ids, sort, order, min_price, max_price, seller_id, offset, limit } = getProductInputDto;

  const matchQuery:any = {
    $match:{}
  }

  if(category_id){
    matchQuery['$match'] = {
      category: convertToObjectId(category_id)
    }
  }

  if(seller_id){
    matchQuery['$match'] = {
      seller: convertToObjectId(seller_id)
    }
  }

  if(search){
    matchQuery['$match'] = {
      pro_input_name: {
        $regex: search, $options: 'i'
      }
    }
  }

  if(attribute_value_ids && attribute_value_ids?.length){
    const attributeValueObjectId = attribute_value_ids.split(',').map((d:string)=>convertToObjectId(d))
  }

  const otherQuery:any = [
    {
      $lookup:
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
        {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
    },
    {
      $set:
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
        {
          from: "productvariants",
          localField: "_id",
          foreignField: "product",
          as: "productvariants",
        },
    },
  ]

  let query:any = [matchQuery];
  query = [...query, ...otherQuery]

  if(max_price && min_price !== undefined){
    const priceFilterQuery = {
      $match: {
        $and: [
          {
            "productvariants.price": {
              $gte: min_price,
            },
          },
          {
            "productvariants.price": {
              $lte: max_price,
            },
          },
        ],
      },
    }
  
    query.push(priceFilterQuery)
  }

  const paginationQuery = [
    {
      $limit:limit,
    },
    {
      $skip:offset,
    }
  ]

  query = [...query, ...paginationQuery]

  return query

}