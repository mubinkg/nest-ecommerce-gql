export const getAllAttribute = [
    {
      $match:
        {
          status: "Active",
        },
    },
    {
      $lookup: {
        from: "productattributevalues",
        localField: "_id",
        foreignField: "productAttribute",
        as: "values",
        pipeline: [
          {
            $match: {
              status: "Active",
            },
          },
          {
            $project: {
              _id: 1,
              valueName: 1,
            },
          },
        ],
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        values: 1,
      },
    },
  ]