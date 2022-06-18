import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity('client')
export class Client extends BaseEntity {
    @PrimaryGeneratedColumn()
      id!: number;

    @Column()
      name!: string;

    @Column({ nullable: true })
      nickname!: string;

    @Column()
      cedula!: string;

    @Column({ nullable: true })
      phone!: string;

    @Column({ nullable: true })
      email!: string;

    @Column()
      address!: string;

    @Column({ nullable: true })
      companyName!: string;

    @Column({ nullable: true })
      rnc!: string;

    @Column({ nullable: true })
      companyPhone!: string;

    @Column({ nullable: true })
      companyEmail!: string;

    @Column({ nullable: true })
      companyAddress!: string;

    @Column({ default: false })
      hasCompanyInfo!: boolean;

    @Column({ default: false })
      hasInfoCopied!: boolean;

    @Column({ default: 15 })
      factDays!: number;

    @Column({ default: false })
      factAuto!: boolean;

    @Column({ default: false })
      sendFact!: boolean;

    @Column({ default: false })
      sendNotification!: boolean;

    @Column({ default: true })
      isActive!: boolean;
}
