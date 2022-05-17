import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Put,
} from '@nestjs/common';
import { CreateRectangleDto } from './dto/create-rectangle.dto';
import { UpdateRectangleDto } from './dto/update-rectangle.dto';
import { RectangleService } from './rectangle.service';

@Controller('rectangle')
export class RectangleController {
  constructor(private readonly rectangleService: RectangleService) {}

  @Get(':name')
  async findOne(@Param('name') name: string) {
    const found = await this.rectangleService.findOne(name);

    if (found === null) throw new NotFoundException();

    return found;
  }

  @Put()
  @HttpCode(201)
  async create(@Body() createRectangleDto: CreateRectangleDto) {
    const found = await this.rectangleService.findOne(createRectangleDto.name);

    if (found !== null) throw new ConflictException();

    await this.rectangleService.create(createRectangleDto);
  }

  @Patch(':name')
  async update(
    @Param('name') name: string,
    @Body() updateRectangleDto: UpdateRectangleDto,
  ) {
    const found = await this.rectangleService.findOne(name);

    if (found === null) throw new NotFoundException();

    await this.rectangleService.update(name, updateRectangleDto);
  }

  @Delete(':name')
  async remove(@Param('name') name: string) {
    const found = await this.rectangleService.findOne(name);

    if (found === null) throw new NotFoundException();

    await this.rectangleService.remove(name);
  }
}
