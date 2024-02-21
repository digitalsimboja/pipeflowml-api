import { Column, Entity, ManyToOne } from "typeorm";
import { User } from "./user";
import DefaultEntity, { SubscriptionStatus } from "./defaultEntity";
import { AIAgent } from "./aiAgent";

@Entity()
export class UserAgentDeployment extends DefaultEntity {

    @ManyToOne(() => User, user => user.agentDeployments)
    user: User;

    @ManyToOne(() => AIAgent, agent => agent.userDeployments)
    agent: AIAgent;

    @Column({ type: 'enum', enum: SubscriptionStatus, default: SubscriptionStatus.INACTIVE, nullable: false })
    subscriptionStatus: SubscriptionStatus;

    @Column()
    subscriptionExpiryDate: Date;
}