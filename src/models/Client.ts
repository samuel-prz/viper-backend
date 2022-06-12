import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity('client')
export class Client extends BaseEntity {
    @PrimaryGeneratedColumn()
      id!: number;

    @Column()
      name!: string;

    @Column()
      nickname!: string;

    @Column({ unique: true })
      cedula!: string;

    @Column({ nullable: true })
      phone!: string;

    @Column({ unique: true })
      email!: string;

    @Column()
      address!: string;

    @Column()
      companyName!: string;

    @Column({ unique: true })
      rnc!: string;

    @Column({ nullable: true })
      companyPhone!: string;

    @Column({ unique: true })
      companyEmail!: string;

    @Column()
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
