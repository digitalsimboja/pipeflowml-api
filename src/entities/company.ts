import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { User } from "./user";
import { Preference } from "./preference";
import { Match } from "./match";
import DefaultEntity from "./defaultEntity";

export enum CompanySize {
    SMALL = "small",
    MEDIUM = "medium",
    LARGE = "large"
}


export interface CompnayProps {
    name: string;
    industry: string ;
    size: CompanySize
    location: string;
}
@Entity({ name: 'company' })
export class Company extends  DefaultEntity {

    @Column({ type: 'text', nullable: false})
    name: string;

    @Column({ type: 'text', nullable: false})
    industry: string;

    @Column({ type: 'enum', enum: CompanySize, default: CompanySize.SMALL, nullable: false})
    size: CompanySize;

    @Column({ type: 'text', nullable: false})
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

    constructor(attr?: CompnayProps) {
        super()
        if(attr) {
            this.name = attr.name;
            this.industry = attr.industry;
            this.location = attr.location;
            this.size = attr.size;
        }
    }
}