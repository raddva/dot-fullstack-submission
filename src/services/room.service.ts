import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from '../entities/room.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
  ) {}

  findAll() {
    return this.roomRepository.find();
  }

  create(name: string, capacity: number) {
    const room = this.roomRepository.create({ name, capacity: Number(capacity) });
    return this.roomRepository.save(room);
  }

  delete(id: number) {
    return this.roomRepository.delete(id);
  }
}