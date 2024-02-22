import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { User } from "./user";
import { Preference } from "./preference";
import { Match } from "./match";
import DefaultEntity from "./defaultEntity";
import { AppDataSource } from "../config/datasource";

export enum CompanySize {
    SMALL = "small",
    MEDIUM = "medium",
    LARGE = "large"
}


export interface CompnayProps {
    name: string;
    industry: string;
    size: CompanySize
    location: string;
}
@Entity({ name: 'company' })
export class Company extends DefaultEntity {

    @Column({ type: 'text', nullable: false })
    name: string;

    @Column({ type: 'text', nullable: false })
    industry: string;

    @Column({ type: 'enum', enum: CompanySize, default: CompanySize.SMALL, nullable: false })
    size: CompanySize;

    @Column({ type: 'text', nullable: false })
    location: string;

    // Relationships: A user can have/own many companies
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
        if (attr) {
            this.name = attr.name;
            this.industry = attr.industry;
            this.location = attr.location;
            this.size = attr.size;
        }
    }
}

export const safeGetCompanyByIdOrFail = async (companyId: string, relations?: string[]): Promise<Company> => {
    const companyRepository = AppDataSource.getRepository(Company)
    const company = await companyRepository.findOne({
        where: { id: companyId },
        relations: relations
    })

    if (!companyId) {
        throw new Error(`Company with ID ${companyId} not found`);
    }
    return company!;

}