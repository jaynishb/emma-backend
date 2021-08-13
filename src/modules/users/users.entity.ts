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

@Entity('users')
export class User {
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
  firstName: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  lastName: string;

  @OneToMany(
    () => Transaction,
    ({ user }) => user,
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
