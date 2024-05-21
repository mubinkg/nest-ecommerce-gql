export const getStockQery = ({limit, offset, isCount=false}:{limit:number,offset:number, isCount:boolean})=>
  {
    const query:any = [
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
          stockType: {
            $first: "$stockType",
          },
          productType: {
            $first: "$productType",
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
                pro_input_image: 1,
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
          productType: 1,
          stockType: 1
        },
      },
      {
        $limit: limit
      },
      {
        $skip: offset
      },
    ]

    if(isCount){
      query.pop();
      query.pop();
      query.push({ $group: { _id: null, count: { $sum: 1 } } })
    }

    return query;
  }