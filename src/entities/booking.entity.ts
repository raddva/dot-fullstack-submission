import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Room } from './room.entity';

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  bookerName!: string;

  @Column({ type: 'date' })
  bookingDate!: Date;

  @ManyToOne(
    () => Room,
    (room) => room.bookings,
    { onDelete: 'CASCADE' }
  )
  @JoinColumn({ name: 'room_id' })
  room!: Room;
}