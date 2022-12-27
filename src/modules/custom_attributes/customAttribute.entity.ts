import {
Column,
CreateDateColumn,
DeleteDateColumn,
Entity,
PrimaryGeneratedColumn,
UpdateDateColumn,
} from 'typeorm';

@Entity({name: 'customAttribute'})
export class CustomAttribute{
@Column({
    type:'uuid',
})
@PrimaryGeneratedColumn('uuid')
id!: string;

@Column({ nullable: true })
key: string;

@Column({ nullable:true})
value : string;


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