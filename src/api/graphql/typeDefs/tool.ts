import { ToolType } from "../../../entities/tool";
import { Field, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class CreateToolResponse {
    @Field(() => ToolType)
    name: ToolType

    @Field(() => String, { nullable: true })
    description?: string;
}

@InputType()
export class CreateToolInput {
    @Field(() => ToolType)
    name: ToolType

    @Field(() => String, { nullable: true })
    description?: string;

    
}