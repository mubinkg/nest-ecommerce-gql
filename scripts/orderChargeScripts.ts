const { MongoClient } = require('mongodb');

const readXlsxFile = require('read-excel-file/node')

readXlsxFile("../data/data.xlsx").then((rows) => {
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);
    const dbName = 'ecommerc';
    const data = []
    for(let i = 3;i<rows.length;i++){
        for(let j=1;j<rows[i].length;j++){
            const countryCode = rows[0][j]
            const countryName = rows[1][j]
            const eramicsCountryName = rows[2][j]
            const weight = rows[i][0]
            const price = parseFloat(rows[i][j]?.split(",")?.join(""))?.toFixed(3) || null

            data.push({countryCode, countryName, eramicsCountryName, weight, price})
        }
    }
    client.connect().then(()=>{
        const db = client.db(dbName)
        const collection = db.collection('deliverycharges');
        collection.insertMany(data).then(()=>{
            console.log('Insert Done')
        })
    })
  })
