
import { ToolType } from "../../../entities/tool";
import { AIAgentDomain, LLMModel } from "../../../entities/agent";
import { Field, ID, InputType, ObjectType, registerEnumType } from "type-graphql";

// Register the enum type
registerEnumType(AIAgentDomain, {
    name: "AIAgentDomain",
    description: "The domain of the AI Agent"
});

registerEnumType(ToolType, {
    name: "ToolType",
    description: "The tools granting more capability to the AI agent"
});

registerEnumType(LLMModel, {
    name: "LLMModel",
    description: "Large Language Model used by the AI agent for language understanding and generation."
})

@ObjectType()
export class ToolResponse {
    @Field()
    name: string;

    @Field()
    isTemplate: boolean;

    @Field(_ => ToolType)
    type!: ToolType;

}

@InputType()
export class CreateAgentInput {
    @Field()
    name: string;

    @Field(_ => String, { nullable: true })
    description?: string;

    @Field(() => LLMModel, { defaultValue: LLMModel.GPT3_5 })
    model: LLMModel;

    @Field(() => AIAgentDomain, { defaultValue: AIAgentDomain.ASSISTANT })
    domain: AIAgentDomain;

    @Field(() => String, { nullable: true })
    instruction?: string;

    @Field(() => String, { nullable: true })
    welcomeMessage?: string;

    @Field()
    useTemplate: boolean;

    @Field(() => [ID], { nullable: true })
    toolIds: string[];
}

@ObjectType()
export class CreateAgentResponse {
    @Field(_ => ID)
    id: string;

    @Field()
    name: string;

    @Field({ nullable: true })
    description?: string;

    @Field(() => AIAgentDomain)
    domain: AIAgentDomain;

    @Field({ nullable: true })
    instruction?: string;

    @Field({ nullable: true })
    welcomeMessage?: string;

    @Field(() => String)
    sharableURL: string;

    @Field(() => [ToolResponse], { nullable: true })
    tools?: ToolResponse[]
}

@InputType()
export class PartialAgentInput {
    @Field({ nullable: true })
    name?: string;

    @Field({ nullable: true })
    description?: string;

    @Field(() => AIAgentDomain, { nullable: true })
    domain: AIAgentDomain;

    @Field({ nullable: true })
    instruction?: string;

    @Field({ nullable: true })
    welcomeMessage?: string;

    @Field(() => [ToolType], { nullable: true })
    tools?: ToolType[]

}
