import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { Feature } from '../feature/feature.entity';
import { User } from '../user/user.entity';

@Entity({ name: 'rule-sets' })
export class Ruleset {
    @Column({
        type: 'uuid',
    })
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    ruleSetKey: string;

    @OneToMany(() => Feature, ({ ruleset }) => ruleset)
    features: Feature[];

    @Column('jsonb', { nullable: true })
    rules?: Record<string, any>[];

    @ManyToOne(() => User, ({ rulesets }) => rulesets)
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
}
