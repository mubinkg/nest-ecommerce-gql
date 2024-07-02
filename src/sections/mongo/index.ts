import { convertToObjectId } from "src/utils/convert-to-objectid";
import { GetSectionsInput } from "../dto/get-sections.input";

export const getSectionQuery = (getSectionInput: GetSectionsInput) => {
    const { section_id, p_limit,p_offset,min_price,max_price , limit, offset} = getSectionInput

    // initail match part for filter section

    const matchPart = {
        $match: {

        }
    }

    if (section_id) {
        matchPart['$match']['_id'] = convertToObjectId(section_id)
    }


    // Product Pipeline

    const pipelinePart:any = [
        {
            $sort: {
                _id: -1,
            },
        },
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
    ]

    if(min_price && max_price){
        const pipelineMatch = {
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
        pipelinePart.push(pipelineMatch)
    }

    if(p_limit){
        const pipelineLimit = {
            $limit: p_limit,
        }
        pipelinePart.push(pipelineLimit)
    }

    if(p_offset){
        const pipelineOffset = {
            $skip: p_offset,
        }
        pipelinePart.push(pipelineOffset)
    }

    let query:any = [
        {
            $lookup: {
                from: "products",
                localField: "products",
                foreignField: "_id",
                as: "products",
                pipeline: pipelinePart
            },
        }
    ]

    if(limit){
        query.push({
            $limit: limit,
        })
    }

    if(offset){
        query.push({
            $skip: offset,
        })
    }

    return query;
}