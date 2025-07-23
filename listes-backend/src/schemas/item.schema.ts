import { Prop } from '@nestjs/mongoose';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class Item {
    @Expose()
    @Prop({ required: true })
    title: string;

    @Expose()
    @Prop({ required: false })
    description: string;
}
