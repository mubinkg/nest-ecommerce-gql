import { Injectable } from '@nestjs/common';
import { CreateMediaInput } from '../dto/create-media.input';
import { UpdateMediaInput } from '../dto/update-media.input';
import { InjectModel } from '@nestjs/mongoose';
import { Media, MediaDocument } from '../entities/media.entity';
import { Model } from 'mongoose';
import { uploadFile } from 'src/util/upload';
import { FileUpload } from 'graphql-upload';

@Injectable()
export class MediaService {

  constructor(
    @InjectModel(Media.name) private readonly mediaModel:Model<MediaDocument>
  ){}

  async create(createMediaInput: CreateMediaInput) {
    try{
      createMediaInput.file = await uploadFile(createMediaInput.file as FileUpload) as string
      return await this.mediaModel.create(createMediaInput)
    }catch(err){
      throw err;
    }
  }

  findAll() {
    return `This action returns all media`;
  }

  findOne(id: number) {
    return `This action returns a #${id} media`;
  }

  update(id: number, updateMediaInput: UpdateMediaInput) {
    return `This action updates a #${id} media`;
  }

  remove(id: number) {
    return `This action removes a #${id} media`;
  }
}
