import { AIAgentDomain } from "../../../entities/agent";
import { Field, ID, InputType, ObjectType, registerEnumType } from "type-graphql";

// Register the enum type
registerEnumType(AIAgentDomain, {
    name: "AIAgentDomain",
    description: "The domain of the AI Agent"
});

@InputType()
export class CreateAIAgentInput {
    @Field()
    name: string;

    @Field()
    description: string;

    @Field()
    model: string;

    @Field(() => AIAgentDomain)
    domain: AIAgentDomain;

    // Optional fields
    @Field(() => String, {nullable: true})
    instruction?: string

    @Field(() => String, {nullable: true})
    welcomeMessage?: string;

    @Field(() => Date, { nullable: true }) 
    timeout?: Date;

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

    @Field()
    description: string;

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
