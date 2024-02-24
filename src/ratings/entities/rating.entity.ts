import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose'
import { Status } from '../data/enum';

@ObjectType()
@Schema({timestamps:true})
export class Rating {
    @Field(()=>String)
    _id: string

    @Field(()=>String, {nullable:true})
    @Prop({type: mongoose.Schema.Types.ObjectId})
    product_id: string

    @Field(()=>String, {nullable:true})
    @Prop({type: mongoose.Schema.Types.ObjectId})
    user_id: string

    @Field(()=>Number, {nullable:true})
    @Prop({type: Number})
    rating?: number

    @Field(()=>String, {nullable:true})
    @Prop({type: String})
    comment?: string

    @Field(()=>[String], {nullable:true})
    images: string[]
    
    @Field(()=>[String], {nullable:true})
    @Prop([{type: String}])
    imageUrl: string[]

    @Field(() => String, { nullable: true})
    @Prop({type: String, default: Status.ACTIVE})
    status?: Status;
}

export type RatingDocument = HydratedDocument<Rating>
export const RatingSchema = SchemaFactory.createForClass(Rating)