import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Booking } from '../entities/booking.entity';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
  ) {}

  findAll(search?: string) {
    if (search) {
      return this.bookingRepository.find({
        where: { bookerName: ILike(`%${search}%`) },
        relations: ['room'],
      });
    }
    return this.bookingRepository.find({ relations: ['room'] });
  }

  create(bookerName: string, bookingDate: string, roomId: number) {
    const booking = this.bookingRepository.create({
      bookerName,
      bookingDate,
      room: { id: Number(roomId) },
    });
    return this.bookingRepository.save(booking);
  }

  delete(id: number) {
    return this.bookingRepository.delete(id);
  }
}