import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { userGuard } from "../auth/user.guard";
import { AddressService } from "./address.service";
import { CreateAddressDto } from "./dto/create-address.dto";
import { UpdateAddressDto } from "./dto/update-address.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Address } from "./entities/address.entity";

@ApiTags("Address")
@Controller("address")
export class AddressController {
  constructor(private readonly addressService: AddressService) {
  }

  @ApiOperation({ summary: "Address Qoshish!" })
  @ApiResponse({ status: 201, type: Address })
  @Post()
  @UseGuards(userGuard)
  create(@Body() createAddressDto: CreateAddressDto) {
    return this.addressService.create(createAddressDto);
  }

  @ApiOperation({ summary: "Addresslarni chiqarish!" })
  @ApiResponse({ status: 200, type: Address })
  @Get()
  findAll() {
    return this.addressService.findAll();
  }

  @ApiOperation({ summary: "Addressni id boyicha olish!" })
  @ApiResponse({ status: 200, type: Address })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.addressService.findOne(+id);
  }

  @ApiOperation({ summary: "Addressni id boyicha  ozgartirish!" })
  @ApiResponse({ status: 201, type: Address })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressService.update(+id, updateAddressDto);
  }

  @ApiOperation({ summary: "Addressni id boyicha  ochirish!" })
  @ApiResponse({ status: 201, type: Address })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.addressService.remove(+id);
  }
}
