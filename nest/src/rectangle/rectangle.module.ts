import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RectangleController } from './rectangle.controller';
import { RectangleService } from './rectangle.service';
import { Rectangle, RectangleSchema } from './schemas/rectangle.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Rectangle.name, schema: RectangleSchema },
    ]),
  ],
  controllers: [RectangleController],
  providers: [RectangleService],
})
export class RectangleModule {}
