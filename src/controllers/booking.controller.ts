import { Controller, Get, Post, Body, Redirect, Render, Param, Query, UseGuards } from '@nestjs/common';
import { BookingService } from '../services/booking.service';
import { RoomService } from '../services/room.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('bookings')
@UseGuards(AuthGuard)
export class BookingController {
  constructor(
    private readonly bookingService: BookingService,
    private readonly roomService: RoomService,
  ) {}

  @Get()
  @Render('bookings')
  async getAllBookings(@Query('search') search: string) {
    const bookings = await this.bookingService.findAll(search);
    const rooms = await this.roomService.findAll();
    return { bookings, rooms, search };
  }

  @Post()
  @Redirect('/bookings')
  async createBooking(
    @Body() body: { bookerName: string; bookingDate: string; roomId: number },
  ) {
    await this.bookingService.create(body.bookerName, body.bookingDate, body.roomId);
  }

  @Post('delete/:id')
  @Redirect('/bookings')
  async deleteBooking(@Param('id') id: number) {
    await this.bookingService.delete(id);
  }
}