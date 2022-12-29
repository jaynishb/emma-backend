import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'segments' })
export class Segments {
    @Column({
        type: 'uuid',
    })
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column('jsonb', { nullable: true })
    filterRules?: Record<string, any>[];

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