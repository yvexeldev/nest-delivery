import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { CardService } from "./card.service";
import { CreateCardDto } from "./dto/create-card.dto";
import { UpdateCardDto } from "./dto/update-card.dto";
import { userGuard } from "../auth/user.guard";
import { adminGuard } from "../auth/admin.guard";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Card")
@Controller("card")
export class CardController {
  constructor(private readonly cardService: CardService) {
  }

  @Post()
  @UseGuards(userGuard)
  create(@Body() createCardDto: CreateCardDto) {
    return this.cardService.create(createCardDto);
  }

  @Get()
  @UseGuards(adminGuard)
  findAll() {
    return this.cardService.findAll();
  }

  @Post(":id")
  @UseGuards(userGuard)
  findOne(@Param("id") id: string, @Body() user_id: string) {
    return this.cardService.findOne(+id, user_id);
  }

  @Patch(":id")
  @UseGuards(userGuard)
  update(@Param("id") id: string, @Body() updateCardDto: UpdateCardDto) {
    return this.cardService.update(+id, updateCardDto);
  }

  @Delete(":id")
  @UseGuards(userGuard)
  remove(@Param("id") id: string) {
    return this.cardService.remove(+id);
  }
}
