import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Expose } from 'class-transformer';
import { Document, ObjectId } from 'mongoose';
import { ExposeId } from 'src/utils/decorators/expose-id.decorator';
import { Item } from './item.schema';

export type ListDocument = List & Document;

@Exclude()
@Schema({ timestamps: true })
export class List {
    @Expose()
    @ExposeId()
    _id: ObjectId | string;

    @Expose()
    @Prop({ required: false, default: '' })
    title: string;

    @Expose()
    @Prop({ type: [Item], required: false })
    items: Item[];
}

export const ListSchema = SchemaFactory.createForClass(List);
