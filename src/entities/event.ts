import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Match } from "./match";

@Entity()
export class Event {
    @PrimaryGeneratedColumn('uuid')
    public readonly id: string;

    @Column()
    name: string;

    @Column()
    date: Date;

    @Column()
    location: string;

    @Column()
    organizingPartner: string

    @OneToMany(() => Match, match => match.event)
    matches: Match[];

}