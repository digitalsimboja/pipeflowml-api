import bcrypt from 'bcrypt';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'user' })
export class User {
    @PrimaryGeneratedColumn('uuid')
    public readonly id: string;

    @CreateDateColumn({ type: 'timestamp with time zone', nullable: false})
    public readonly createdAt: Date

    @UpdateDateColumn({ type: 'timestamp with time zone', nullable: false})
    public readonly updatedAt: Date;
    
    @Column({ type: 'text', nullable: false })
    public email: string;

    @Column({ type: 'text', nullable: false })
    public password: string;
}

export const hashPassword = (password: string): Promise<string> => bcrypt.hash(password, 10);