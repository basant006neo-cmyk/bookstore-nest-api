import {
  Controller,
  Get,
  Post,
  Body, 
  UseGuards,
  Req,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';  
import { ApiBearerAuth } from '@nestjs/swagger'; 
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from 'src/modules/users/user.entity';
import { JwtAuthGuard } from '../auth/jwt.guard';

@ApiBearerAuth("access-token")
@UseGuards(JwtAuthGuard)
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get('latest')
  getLatest(@CurrentUser() user : User) {
    return this.addressService.getLatest(user.id);
  }


  @Post()
  save(@CurrentUser() user : User , @Body() dto : CreateAddressDto) {
    return this.addressService.save(user.id, dto);
  }
}
