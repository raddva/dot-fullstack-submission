import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from '../entities/admin.entity';

@Injectable()
export class AdminService implements OnModuleInit {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  async onModuleInit() {
    const adminCount = await this.adminRepository.count();
    if (adminCount === 0) {
      const defaultAdmin = this.adminRepository.create({
        username: 'admin',
        password: 'admin123',
      });
      await this.adminRepository.save(defaultAdmin);
      console.log('Default admin created: admin / admin123');
    }
  }

  async validateAdmin(username: string, password: string): Promise<boolean> {
    const admin = await this.adminRepository.findOne({ where: { username } });
    if (admin && admin.password === password) {
      return true;
    }
    return false;
  }
}