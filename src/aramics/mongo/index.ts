export const getCharge = (currentWeight:string, country:string)=>{
  return [
    {
      $match:
        {
          eramicsCountryName: country
        }
    },
    {
      $sort:
        {
          weight: 1
        }
    },
    {
      $match:
        {
          weight: {
            $gte: currentWeight
          }
        }
    },
    {
      $group:
        {
          _id: null,
          value: {
            $first: "$weight"
          }
        }
    }
  ]
}