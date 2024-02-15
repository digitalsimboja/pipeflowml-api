import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Match } from "./match";

@Entity()
export class Feedback {
    @PrimaryGeneratedColumn('uuid')
    public readonly id: string;

    @Column()
    feedbackComments: string;

    @Column()
    rating: number;

    @ManyToOne(() => Match, match => match.feedbacks)
    match: Match;

    
}