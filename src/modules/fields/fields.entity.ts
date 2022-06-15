import {
    Column,
    CreateDateColumn,
    Entity,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
    ManyToOne,
} from 'typeorm';
import { User } from '../user/user.entity';
import { FieldType } from './enum/field-type.enum';

@Entity({ name: 'fields' })
export class Field {
    @Column({
        type: 'uuid',
    })
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ nullable: true })
    name: string;

    @Column({
        type: 'enum',
        enum: FieldType,
        nullable: false,
        default: FieldType.STRING,
    })
    type: string;

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
}
