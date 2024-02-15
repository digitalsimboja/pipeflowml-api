import { BaseEntity, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export default abstract class DefaultEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    public readonly id: string;
  
    @CreateDateColumn({ type: 'timestamp with time zone', nullable: false })
    public readonly createdAt: Date;
  
    @UpdateDateColumn({ type: 'timestamp with time zone', nullable: false })
    public readonly updatedAt: Date;
  
    constructor() {
      super();
    }
}