import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from '../entities/admin.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  async validateAdmin(username: string, password_input: string): Promise<boolean> {
    const admin = await this.adminRepository.findOne({ where: { username } });
    if (admin) {
      const isMatch = await bcrypt.compare(password_input, admin.password);
      if (isMatch) {
        return true;
      }
    }
    return false;
  }
}