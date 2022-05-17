import { PartialType } from '@nestjs/mapped-types';
import { IsDefined } from 'class-validator';
import { CreateRectangleDto } from './create-rectangle.dto';

export class UpdateRectangleDto extends PartialType(CreateRectangleDto) {
  @IsDefined()
  readonly width: number;

  @IsDefined()
  readonly height: number;
}
