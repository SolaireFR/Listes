import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { List, ListDocument } from '../schemas/list.schema';

@Injectable()
export class ListsService {
    constructor(@InjectModel('List') private listsModel: Model<ListDocument>) {}

    async findAll(): Promise<List[]> {
        return this.listsModel.find().exec();
    }

    async create(data: Partial<List>): Promise<List> {
        const createdList = new this.listsModel(data);
        return await createdList.save();
    }

    async update(id: string, data: Partial<List>): Promise<List> {
        if (!isValidObjectId(id)) {
            throw new BadRequestException(`L'ID ${id} n'est pas un ID MongoDB valide`);
        }
        const updatedList = await this.listsModel
            .findByIdAndUpdate(id, data, { new: true, runValidators: true })
            .exec();
        if (!updatedList) {
            throw new NotFoundException(`La liste avec l'ID ${id} n'a pas été trouvée`);
        }
        return updatedList;
    }

    async delete(id: string): Promise<void> {
        if (!isValidObjectId(id)) {
            throw new BadRequestException(`L'ID ${id} n'est pas un ID MongoDB valide`);
        }
        const result = await this.listsModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`La liste avec l'ID ${id} n'a pas été trouvée`);
        }
    }
}
