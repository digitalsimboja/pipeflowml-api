import { Column, Entity, ManyToOne } from "typeorm";
import DefaultEntity from "./defaultEntity";
import { User } from "./user";
import { IntegratedTool } from "./tool";

export enum AIAgentDomain {
    SALES = "Sales",
    CUSTOMERSERVICE = 'Customer Service',
    TECHNICAL_SUPPORT = 'Technical Support',
    HR = 'HR',
    MARKETING = 'Marketing',
    LEGAL = 'Legal',
    HEALTHCARE = 'Healthcare',
    REAL_ESTATE = 'Real Estate',
    FINANCIAL = 'Financial',
    ASSISTANT = 'Assistant'
}

export enum LLMModel {
    GPT3_5 = "OPENAI GPT3.5",
    GPT3_5_16_K = "OPENAI GPT3.5 16K",
    GPT3_5_0613 = "OPENAI GPT3.5 0613",
    GPT3_5_1106 = "OPENAI GPT3.5 1106",
    GPT4 = "OPENAI GPT4",
    GPT4_32K_0613 = "OPENAI GPT4 32K 0613",
    GPT4_0613 = "OPENAI GPT4 0613",
    GPT4_TURBO_1106 = "OPENAI GPT4 TURBO 1106",
    GPT4_TURBO_0125 = "OPENAI GPT4 TURBO 0125",
    FIREWORKS = "FIREWORKS AI FUNCTION CALLING 34B"
}
@Entity()
export class Agent extends DefaultEntity {
    @Column()
    name: string;

    @Column({ nullable: true, type: 'text', default: '' })
    description: string;

    @Column({ type: 'enum', enum: LLMModel, nullable: false, default: LLMModel.GPT3_5 })
    model: LLMModel;

    @Column({ type: 'enum', enum: AIAgentDomain, nullable: false })
    domain: AIAgentDomain;

    @Column({ nullable: true, type: 'text', default: '' })
    instruction?: string;

    @Column({ nullable: true, type: 'text', default: '' })
    welcomeMessage?: string;

    @Column({ type: 'simple-array', enum: IntegratedTool, nullable: false })
    tools: IntegratedTool[];

    @Column({ type: 'text', default: '' })
    sharableURL: string;

    @ManyToOne(() => User, user => user.agents)
    user: User;


}