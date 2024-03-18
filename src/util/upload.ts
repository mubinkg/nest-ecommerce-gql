import {Storage} from '@google-cloud/storage'
import { FileUpload } from 'graphql-upload'
import * as path from 'path'
import {v4 as uuidV4} from 'uuid'

const storage = new Storage({
    keyFilename: path.join(__dirname, '../../bucket.json'),
    projectId: "kocart-3ccbb"
})

export const kocartBucket = storage.bucket('kocart')

export async function uploadFile(file:FileUpload){
    try{
        const {createReadStream, filename} = await file
        const modifiedFilename = uuidV4() + filename
        return new Promise((resolve, reject)=>{
            createReadStream()
            .pipe(
                kocartBucket.file(modifiedFilename).createWriteStream({
                    resumable: false,
                    gzip: true,
                    metadata: {
                        contentType: 'application/octet-stream', // Set the content type according to your file type
                        predefinedAcl: 'publicRead', // Make the file public
                    }
                })
            ).on('finish', ()=>{
                resolve(`https://storage.cloud.google.com/kocart/${modifiedFilename}`)
            }).on('error', reject)
        })
    }
    catch(err){
        throw err;
    }
}