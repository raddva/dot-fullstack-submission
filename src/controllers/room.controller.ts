import { Controller, Get, Post, Body, Redirect, Render, Param, UseGuards } from '@nestjs/common';
import { RoomService } from '../services/room.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('rooms')
@UseGuards(AuthGuard)
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  @Render('rooms')
  async getAllRooms() {
    const rooms = await this.roomService.findAll();
    return { rooms };
  }

  @Get('detail/:id')
  @Render('room-detail')
  async getRoomDetail(@Param('id') id: number) {
    const room = await this.roomService['roomRepository'].findOne({
      where: { id },
      relations: ['bookings'],
    });
    return { room };
  }

  @Post()
  @Redirect('/rooms')
  async createRoom(@Body() body: { name: string; capacity: number }) {
    await this.roomService.create(body.name, body.capacity);
  }

  @Post('delete/:id')
  @Redirect('/rooms')
  async deleteRoom(@Param('id') id: number) {
    await this.roomService.delete(id);
  }
}