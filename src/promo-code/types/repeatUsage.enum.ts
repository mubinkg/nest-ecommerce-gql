import { registerEnumType } from "@nestjs/graphql";

export enum RepeatUsage{
    ALLOWED='Allowed',
    NOT_ALLOWED='Not Allowed'
}

registerEnumType(RepeatUsage,{
    name:'RepeatUsage'
})