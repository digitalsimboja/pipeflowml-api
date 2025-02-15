import bcrypt from 'bcrypt';
import { Column, Entity, OneToMany } from "typeorm";
import { Company } from './company';
import DefaultEntity from './defaultEntity';
import { Context } from '../api/graphql/common';
import { AppDataSource } from '../config/datasource';
import { Agent } from './agent';


export interface UserProps {
    email: string;
    password: string;

}
@Entity()
export class User extends DefaultEntity {

    @Column({ type: 'text', nullable: false })
    public email: string;

    @Column({ type: 'text', nullable: false })
    public password: string;

    @OneToMany(() => Company, company => company.user)
    businessProfile: Company[];

    // List of agents deployed by the user
    @OneToMany(() => Agent, agent => agent.user)
    agents: Agent[];

    constructor(data?: UserProps) {
        super()
        if (data) {
            this.email = data.email.trim()
            this.password = data.password

        }
    }

}
//TODO: Modify to make more scalable and to load relations appropriately
export const safeFindUserOrFail = async (id: string, ctx: Context, relations?: string[]): Promise<User> => {
    const userId = ctx.userId;
    if (userId !== id) {
        throw new Error("Not authorized");
    }
    const userRepository = AppDataSource.getRepository(User)
    const user = await userRepository.findOne({
        where: { id: userId },
        relations: relations
    })
    if (!user) {
        throw new Error("User not found")
    }
    return user

}

export const hashPassword = (password: string): Promise<string> => bcrypt.hash(password, 10);

export const authenticateUser = (userPassword: string, hash: string): Promise<boolean> => bcrypt.compare(userPassword, hash);