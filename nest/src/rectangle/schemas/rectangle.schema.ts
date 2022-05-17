import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type RectangleDocument = Rectangle & Document;

@Schema()
export class Rectangle {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  width: number;

  @Prop({ required: true })
  height: number;
}

export const RectangleSchema = SchemaFactory.createForClass(Rectangle);
