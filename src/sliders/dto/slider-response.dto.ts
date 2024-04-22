import { Field, ObjectType } from "@nestjs/graphql";
import { Slider } from "../entities/slider.entity";

@ObjectType()
export class SliderResponseDto{
    @Field(()=>[Slider], {nullable:true})
    sliders?: Slider[]

    @Field(()=>Number, {nullable:true})
    count?: number
}