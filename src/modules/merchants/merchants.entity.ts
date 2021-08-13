import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Transaction } from '../transactions/transactions.entity';

@Entity('merchants')
export class Merchant {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'uuid',
    unique: true,
    nullable: false,
    readonly: true,
  })
  uuid: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  displayName: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  description: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  iconUrl: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  funnyGifUrl: string;

  @Column({
    type: 'timestamptz',
    nullable: true,
  })
  date: Date;

  @Column({
    type: 'float4',
    nullable: true,
    default: 0,
  })
  amount: Number;

  @OneToMany(
    () => Transaction,
    ({ merchant }) => merchant,
    { eager: true, cascade: true },
  )
  transactions: Transaction[];

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
  })
  updatedAt: Date;
}
