import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from 'typeorm';

import { Booking } from './booking.entity';

@Entity('rooms')
export class Room {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  capacity!: number;

  @OneToMany(
    () => Booking,
    (booking) => booking.room
  )
  bookings!: Booking[];
}