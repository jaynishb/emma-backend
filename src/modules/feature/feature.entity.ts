import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { Ruleset } from '../rule-set/rule-set.entity';
import { User } from '../user/user.entity';

@Entity({ name: 'features' })
export class Feature {
    @Column({
        type: 'uuid',
    })
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ nullable: true })
    name: string;

    @Column({ unique: true, nullable: false })
    featureKey: string;

    @Column({ nullable: true })
    description: string;

    @Column({ default: false })
    enabled: boolean;

    @Column('simple-array')
    tags: string[];

    @Column('jsonb', { nullable: true })
    variants?: Record<string, any>[];

    @Column('jsonb', { nullable: true })
    rules?: Record<string, any>[];

    @ManyToOne(() => Ruleset, ({ features }) => features, { eager: true })
    ruleset: Ruleset;

    @Column('jsonb', { nullable: true })
    values?: Record<string, any>[];

    @ManyToOne(() => User, ({ features }) => features, { eager: true })
    createdBy: User;

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

    @DeleteDateColumn()
    deletedAt?: Date;
}
