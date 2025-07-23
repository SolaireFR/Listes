import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';
import { Item } from 'src/schemas/item.schema';

export class CreateListDto {
    @ApiProperty({
        required: false,
        description: 'Titre de la liste',
        example: 'Ma liste de cours',
    })
    @IsString()
    title: string;

    @ApiProperty({
        type: [Item],
        required: false,
        description: 'Tableau des éléments',
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Item)
    items: Item[];
}

export class UpdateListDto extends PartialType(CreateListDto) {}
