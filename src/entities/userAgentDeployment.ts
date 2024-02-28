import {  Entity, ManyToOne } from "typeorm";
import { User } from "./user";
import DefaultEntity from "./defaultEntity";
import { Agent } from "./agent";

@Entity()
export class UserAgentDeployment extends DefaultEntity {

    @ManyToOne(() => User, user => user.agentDeployments)
    user: User;

    @ManyToOne(() => Agent, agent => agent.userDeployments)
    agent: Agent;

}