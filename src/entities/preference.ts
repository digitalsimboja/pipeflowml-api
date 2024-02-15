import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "./company";

@Entity({ name: "preference" })
export class Preference {
    @PrimaryGeneratedColumn('uuid')
    public readonly id: string;

    @Column()
    preferredIndustry: string;

    @Column()
    preferredBusinessSize: string;

    @Column()
    geographicPreferences: string;

    @ManyToOne(() => Company, company => company.preferences)
    @JoinColumn({ name: 'company_id' })
    businessProfile: Company;
}