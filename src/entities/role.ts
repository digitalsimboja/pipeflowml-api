import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";



@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    public readonly id: string;

    @Column()
    name: string;

    @OneToMany(() => User, (user) => user.role)
    users: User[];
}