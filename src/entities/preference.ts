import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { Company } from "./company";
import DefaultEntity from "./defaultEntity";
import { User } from "./user";

@Entity({ name: "preference" })
export class Preference extends DefaultEntity {
    @Column()
    preferredIndustry: string;

    @Column()
    preferredBusinessSize: string;

    @Column()
    geographicPreferences: string;

    @Column('simple-array')
    preferredAgentDomains: string[];

    @Column()
    subscriptionPlans: string;

    @Column()
    preferredLanguage: string;

    @OneToOne(() => User)
    user: User;

    @ManyToOne(() => Company, company => company.preferences)
    @JoinColumn({ name: 'company_id' })
    businessProfile: Company;
}