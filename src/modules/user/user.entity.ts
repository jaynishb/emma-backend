import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { RoleType } from '../../common/constants/role-type';
import { Feature } from '../feature/feature.entity';
import { Ruleset } from '../rule-set/rule-set.entity';

@Entity({ name: 'users' })
export class User {
    @Column({
        type: 'uuid',
    })
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ nullable: true })
    firstName: string;

    @Column({ nullable: true })
    lastName: string;

    @Column({ type: 'enum', enum: RoleType, default: RoleType.USER })
    role: RoleType;

    @Column({ unique: true, nullable: true })
    email: string;

    @Column({ nullable: true, select: false })
    password: string;

    @Column({ nullable: true })
    phone: string;

    @Column({ nullable: true })
    avatar: string;

    @OneToMany(() => Ruleset, ({ createdBy }) => createdBy)
    rulesets: Ruleset[];

    @OneToMany(() => Feature, ({ createdBy }) => createdBy)
    features: Feature[];

    @CreateDateColumn({
        type: 'timestamptz',
        nullable: false,
        readonly: true,
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamptz',
        nullable: false,
        readonly: true,
        select: false,
    })
    updatedAt: Date;
}
