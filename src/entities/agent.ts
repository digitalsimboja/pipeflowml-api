import { Column, Entity, OneToMany } from "typeorm";
import DefaultEntity from "./defaultEntity";
import { UserAgentDeployment } from "./userAgentDeployment";
import { Tool } from "./tool";

export enum AIAgentDomain {
    SALES = "Sales",
    CUSTOMERSERVICE = 'Customer Service',
    TECHNICAL_SUPPORT = 'Technical Support',
    HR = 'HR',
    MARKETING = 'Marketing',
    LEGAL = 'Legal',
    HEALTHCARE = 'Healthcare',
    REAL_ESTATE = 'Real Estate',
    FINANCIAL = 'Financial'
}

@Entity()
export class AIAgent extends DefaultEntity {
    @Column()
    name: string; // name of the agent when responding to output

    @Column({ nullable: true, type: 'text' })
    description?: string;

    @Column()
    model: string;

    @Column({ type: 'enum', enum: AIAgentDomain, nullable: false })
    domain: AIAgentDomain

    // Prompt instruction: e.g You are a helpful, respectful and honest assistant. If you don't know the answer to a question, please don't share false information.
    @Column({ nullable: true, type: 'text' })
    instruction?: string;

    @Column({ nullable: true, type: 'text' })
    welcomeMessage?: string

    // The work period of the Agent. The agent wakes up after this timeout
    @Column({ nullable: true, type: 'timestamp' })
    timeout: Date;

    @Column({ nullable: true })
    preTrainedDataURL?: string; // Represents the URL or the index of the Pinecone  Dataset used for training


    @Column({ type: 'text' })
    sharableURL: string;  // Shareable link

    @OneToMany(() => UserAgentDeployment, deployment => deployment.agent)
    userDeployments: UserAgentDeployment[];

    @OneToMany(() => Tool, tool => tool.agent) // List of integrated tools to be used by the agent
    tools: Tool[];
}