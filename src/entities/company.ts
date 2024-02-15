import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";
import { Preference } from "./preference";
import { Match } from "./match";

@Entity({ name: 'company' })
export class Company {
    @PrimaryGeneratedColumn('uuid')
    public readonly id: string;

    @Column()
    name: string;

    @Column()
    industry: string;

    @Column()
    size: string;

    @Column()
    location: string;

    // Relationships
    @ManyToOne(() => User, user => user.businessProfile)
    user: User;

    @OneToMany(() => Preference, preference => preference.businessProfile)
    preferences: Preference[];

    @OneToMany(() => Match, match => match.firstBusiness)
    matchesAsFirstCompany: Match[];

    @OneToMany(() => Match, match => match.secondBusiness)
    matchesAsSecondBuisness: Match[];
}