import bcrypt from 'bcrypt';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Role } from './role';
import { Company } from './company';

@Entity({ name: 'user' })
export class User {
    @PrimaryGeneratedColumn('uuid')
    public readonly id: string;
    
    @Column({ type: 'text', nullable: false })
    public email: string;

    @Column({ type: 'text', nullable: false })
    public password: string;

    @CreateDateColumn({ type: 'timestamp with time zone', nullable: false})
    public readonly createdAt: Date

    @UpdateDateColumn({ type: 'timestamp with time zone', nullable: false})
    public readonly updatedAt: Date;
    
    @ManyToOne(() => Role, {eager: true})
    @JoinColumn({ name: 'roleId'})
    role: Role;

    @OneToMany(() => Company, company => company.user)
    businessProfile: Company[];


}

export const hashPassword = (password: string): Promise<string> => bcrypt.hash(password, 10);

export const authenticateUser = (userPassword: string, hash: string): Promise<boolean> => bcrypt.compare(userPassword, hash);