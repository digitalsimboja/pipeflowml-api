import bcrypt from 'bcrypt';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Role } from './role';

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
}

export const hashPassword = (password: string): Promise<string> => bcrypt.hash(password, 10);