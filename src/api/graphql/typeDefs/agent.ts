
import { IntegratedTool } from "../../../entities/tool";
import { AIAgentDomain } from "../../../entities/agent";
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


@InputType()
export class CreateAgentInput {
    @Field()
    name: string;

    @Field(_ => String, { nullable: true })
    description?: string;

    @Field()
    model: string;

    @Field(() => AIAgentDomain)
    domain: AIAgentDomain;

    // Optional fields
    @Field(() => String, { nullable: true })
    instruction?: string;

    @Field(() => String, { nullable: true })
    welcomeMessage?: string;

    @Field(() => [IntegratedTool], { nullable: true })
    tools?: IntegratedTool[]

    @Field(() => Date, { nullable: true })
    timeout?: Date | null;

    @Field({ nullable: true })
    preTrainedDataURL?: string;

    @Field({ nullable: true })
    pricing?: string;
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

    @Field({ nullable: true })
    timeout?: Date;

    @Field({ nullable: true })
    preTrainedDataURL?: string;

    @Field({ nullable: true })
    pricing?: string;

    @Field()
    embed: string;
}
