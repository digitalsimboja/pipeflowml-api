import { Column, Entity, OneToMany } from "typeorm";
import DefaultEntity from "./defaultEntity";
import { UserAgentDeployment } from "./userAgentDeployment";

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

    @Column({ type: 'enum', enum: AIAgentDomain, nullable: false })
    domain: AIAgentDomain

    @Column()
    features: string;

    @Column()
    preTrainedData: string;

    @Column()
    pricing: string;

    @OneToMany(() => UserAgentDeployment, deployment => deployment.agent)
    userDeployments: UserAgentDeployment[];
}