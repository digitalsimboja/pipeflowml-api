import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { Company } from "./company";
import DefaultEntity from "./defaultEntity";
import { User } from "./user";

@Entity()
export class Preference extends DefaultEntity {
    @Column({nullable: true  })
    preferredIndustry: string;

    @Column({nullable: true  })
    preferredBusinessSize: string;

    @Column({nullable: true  })
    geographicPreferences: string;

    @Column({nullable: true  })
    subscriptionPlans: string;

    @Column({nullable: true  })
    preferredLanguage: string;

    @OneToOne(() => User)
    user: User;

    @ManyToOne(() => Company, company => company.preferences)
    @JoinColumn({ name: 'company_id' })
    businessProfile: Company;
}