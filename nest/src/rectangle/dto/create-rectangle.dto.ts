import { IsDefined } from 'class-validator';

export class CreateRectangleDto {
  @IsDefined()
  readonly name: string;

  @IsDefined()
  readonly width: number;

  @IsDefined()
  readonly height: number;
}
