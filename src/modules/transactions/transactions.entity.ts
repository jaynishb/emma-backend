import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Merchant } from '../merchants/merchants.entity';
import { User } from '../users/users.entity';

@Entity('transactions')
export class Transaction {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  @Column({
    type: 'integer',
    nullable: false,
    readonly: true,
  })
  userId: number;

  @Exclude()
  @ManyToOne(
    () => User,
    ({ transactions }) => transactions,
  )
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Exclude()
  @Column({
    type: 'integer',
    nullable: false,
    readonly: true,
  })
  merchantId: number;

  @Exclude()
  @ManyToOne(
    () => Merchant,
    ({ transactions }) => transactions,
  )
  @JoinColumn({ name: 'merchant_id' })
  merchant: Merchant;


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
