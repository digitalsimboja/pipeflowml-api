import bcrypt from 'bcrypt';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Role } from './role';
import { Company } from './company';
import DefaultEntity from './defaultEntity';


export interface UserProps {
    email: string;
    password: string;

}
@Entity({ name: 'user' })
export class User extends DefaultEntity {
    
    @Column({ type: 'text', nullable: false })
    public email: string;

    @Column({ type: 'text', nullable: false })
    public password: string;
    
    @ManyToOne(() => Role, {eager: true})
    @JoinColumn({ name: 'roleId'})
    role: Role;

    @OneToMany(() => Company, company => company.user)
    businessProfile: Company[];

    constructor(data?: UserProps) {
        super()
        if (data) {
            this.email = data.email.trim()
            this.password = data.password
        }
    }


}

export const hashPassword = (password: string): Promise<string> => bcrypt.hash(password, 10);

export const authenticateUser = (userPassword: string, hash: string): Promise<boolean> => bcrypt.compare(userPassword, hash);