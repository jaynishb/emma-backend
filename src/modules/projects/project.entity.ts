import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { User } from '../user/user.entity';

@Entity({ name: 'projects' })
export class Project {
    @Column({
        type: 'uuid',
    })
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    featureCount?: number;

    @Column({ nullable: true })
    description: string;

    @ManyToOne(() => User, ({ projects }) => projects, { eager: true })
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
