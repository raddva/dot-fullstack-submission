import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Admin } from './entities/admin.entity';
import { Room } from './entities/room.entity';
import { Booking } from './entities/booking.entity';
import { RoomController } from './controllers/room.controller';
import { BookingController } from './controllers/booking.controller';
import { RoomService } from './services/room.service';
import { BookingService } from './services/booking.service';
import { AuthController } from './controllers/auth.controller';
import { AdminService } from './services/admin.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '5432', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Room, Booking, Admin],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([Room, Booking, Admin]),
  ],
  controllers: [RoomController, BookingController, AuthController],
  providers: [RoomService, BookingService, AdminService],
})
export class AppModule {}