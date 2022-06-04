import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity('user')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
      id!: number;

    @Column()
      firstName!: string;

    @Column()
      lastName!: string;

    @Column({ unique: true })
      username!: string;

    @Column({ nullable: true })
      phone!: string;

    @Column({ unique: true })
      email!: string;

    @Column({ select: false })
      password!: string;

    @Column({ default: true })
      isActive!: boolean;
}
