import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "./company";
import { Event } from "./event";
import { Feedback } from "./feedback";

@Entity()
export class Match {
    @PrimaryGeneratedColumn('uuid')
    public readonly id: string;

    @Column()
    matchStrength: number;

    @Column()
    feedbackScore: number;

    @ManyToOne(() => Company, company => company.matchesAsFirstCompany)
    firstBusiness: Company;

    @ManyToOne(() => Company, company => company.matchesAsSecondBuisness)
    secondBusiness: Company;

    @ManyToOne(() => Event, event => event.matches)
    event: Event;

    @OneToMany(() => Feedback, feedback => feedback.match)
    feedbacks: Feedback[];
}