import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Merchant } from '../merchants/merchants.entity';
import { User } from '../users/users.entity';

@Entity('day_transactions')
export class Transaction {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'uuid',
    unique: true,
    nullable: false,
    readonly: true,
  })
  @Generated('uuid')
  uuid: string;

  @Exclude()
  @ManyToOne(
    () => User,
    ({ transactions }) => transactions,
  )
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Exclude()
  @ManyToOne(
    () => Merchant,
    ({ transactions }) => transactions,
  )
  @JoinColumn({ name: 'merchant_id' })
  merchant: Merchant;

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
  total: Number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    nullable: false,
    readonly: true,
  })
  createdAt: number;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    nullable: false,
    readonly: true,
  })
  updatedAt: number;
}
