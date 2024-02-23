import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@ObjectType()
@Schema()
export class Rating {
    @Field(()=>String)
    _id: string

    @Field(()=>String, {nullable:true})
    @Prop({type: mongoose.Schema.Types.ObjectId})
    product_id: string

    @Field(()=>Number, {nullable:true})
    @Prop({type: Number})
    rating?: number

    @Field(()=>String, {nullable:true})
    @Prop({type: String})
    comment?: string

    @Field(()=>[String], {nullable:true})
    @Prop([{type: String}])
    images: string[]
}
