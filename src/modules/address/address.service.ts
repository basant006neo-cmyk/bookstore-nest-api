import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AddressService {
  constructor(@InjectRepository(Address) private repo: Repository<Address>) {}

   save(userId: number, dto : CreateAddressDto) {
    return this.repo.save({ ...dto, user: { id: userId } });
  }

  getLatest(userId: number) {
    return this.repo.findOne({
      where: { user: { id: userId } },
      order: { id: 'DESC' },
    });
  }
}
