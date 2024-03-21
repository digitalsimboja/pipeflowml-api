import { IntegratedTool } from "../../../entities/tool";
import { Field, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class CreateToolResponse {
    @Field(() => IntegratedTool)
    name: IntegratedTool

    @Field(() => String, { nullable: true })
    description?: string;
}

@InputType()
export class CreateToolInput {
    @Field(() => IntegratedTool)
    name: IntegratedTool

    @Field(() => String, { nullable: true })
    description?: string;

    
}