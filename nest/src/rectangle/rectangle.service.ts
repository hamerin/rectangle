import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRectangleDto } from './dto/create-rectangle.dto';
import { UpdateRectangleDto } from './dto/update-rectangle.dto';
import { Rectangle, RectangleDocument } from './schemas/rectangle.schema';

@Injectable()
export class RectangleService {
  constructor(
    @InjectModel(Rectangle.name)
    private rectangleModel: Model<RectangleDocument>,
  ) {}

  async findOne(name: string): Promise<Rectangle | null> {
    return this.rectangleModel
      .findOne({ name })
      .select('-_id -__v')
      .lean()
      .exec();
  }

  async create(createRectangleDto: CreateRectangleDto): Promise<void> {
    await new this.rectangleModel(createRectangleDto).save();
  }

  async update(
    name: string,
    updateRectangleDto: UpdateRectangleDto,
  ): Promise<void> {
    await this.rectangleModel.updateOne({ name }, updateRectangleDto).exec();
  }

  async remove(name: string): Promise<void> {
    await this.rectangleModel.deleteOne({ name }).exec();
  }
}
