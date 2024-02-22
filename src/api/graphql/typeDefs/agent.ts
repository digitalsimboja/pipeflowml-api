import { AIAgentDomain } from "../../../entities/agent";
import { Field, ID, InputType, ObjectType, registerEnumType } from "type-graphql";

registerEnumType(AIAgentDomain, {
    name: "AIAgentDomain",
    description: "The domain of the AI Agent"
})

@InputType()
export class createAIAgentInput {
    @Field()
    name: string;

    @Field()
    description: string;

    @Field(() => AIAgentDomain)
    domain: AIAgentDomain

    @Field()
    features: string;

    // Path to uploaded file for pre-trained data
    @Field({ nullable: true }) 
    preTrainedData?: string;

    @Field({nullable: true})
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
    domain: AIAgentDomain

    @Field()
    features: string;

    // Path to uploaded file for pre-trained data
    @Field({ nullable: true }) 
    preTrainedData?: string;

    @Field({nullable: true})
    pricing?: string;

    @Field()
    embed: string;
}