import { Column, Entity, OneToMany } from "typeorm";
import DefaultEntity from "./defaultEntity";
import { UserAgentDeployment } from "./userAgentDeployment";
import Tools from "./tools";

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
    name: string;

    @Column()
    description: string;

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
    preTrainedDataURL?: string;

    @Column({ nullable: true })
    pricing?: string;

    @Column({ type: 'text' })
    embed: string;

    // Integrated tools
    @OneToMany(() => Tools, tool => tool.agent)
    tools: Tools[];

    @OneToMany(() => UserAgentDeployment, deployment => deployment.agent)
    userDeployments: UserAgentDeployment[];
}