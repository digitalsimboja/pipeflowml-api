
import { IntegratedTool } from "../../../entities/tool";
import { AIAgentDomain, LLMModel } from "../../../entities/agent";
import { Field, ID, InputType, ObjectType, registerEnumType } from "type-graphql";

// Register the enum type
registerEnumType(AIAgentDomain, {
    name: "AIAgentDomain",
    description: "The domain of the AI Agent"
});

registerEnumType(IntegratedTool, {
    name: "IntegratedTool",
    description: "The tools granting more capability to the AI agent"
});

registerEnumType(LLMModel, {
    name: "LLMModel",
    description: "Language Learning Model used by the AI agent for language understanding and generation."
})


@InputType()
export class CreateAgentInput {
    @Field()
    name: string;

    @Field(_ => String, { nullable: true })
    description?: string;

    @Field(() => LLMModel, { defaultValue: LLMModel.GPT3_5 })
    model: LLMModel;

    @Field(() => AIAgentDomain, {defaultValue: AIAgentDomain.ASSISTANT})
    domain: AIAgentDomain;

    // Optional fields
    @Field(() => String, { nullable: true })
    instruction?: string;

    @Field(() => String, { nullable: true })
    welcomeMessage?: string;

    @Field(() => [IntegratedTool], { nullable: true })
    tools?: IntegratedTool[]
}

@ObjectType()
export class AIAgentResponse {
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
}
