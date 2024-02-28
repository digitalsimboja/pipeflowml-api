import {  Entity, ManyToOne } from "typeorm";
import { User } from "./user";
import DefaultEntity from "./defaultEntity";
import { AIAgent } from "./agent";

@Entity()
export class UserAgentDeployment extends DefaultEntity {

    @ManyToOne(() => User, user => user.agentDeployments)
    user: User;

    @ManyToOne(() => AIAgent, agent => agent.userDeployments)
    agent: AIAgent;

}