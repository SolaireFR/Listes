import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ListsService } from '../services/lists.service';
import { CreateListDto, UpdateListDto } from 'src/dtos/list.dto';
import { List } from 'src/schemas/list.schema';

@ApiTags('Lists')
@Controller('lists')
export class ListsController {
    constructor(private readonly listsService: ListsService) {}

    @Get()
    @ApiOperation({ summary: 'Récupérer toutes les listes' })
    @ApiResponse({ status: 200, description: 'Liste des listes', type: [List] })
    async getAllLists(): Promise<List[]> {
        return this.listsService.findAll();
    }

    @Post()
    @ApiOperation({ summary: 'Créer une nouvelle liste' })
    @ApiResponse({ status: 201, description: 'Liste créée', type: List })
    @ApiResponse({ status: 400, description: 'Données invalides' })
    async createList(@Body() createListDto: CreateListDto): Promise<List> {
        return this.listsService.create(createListDto);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Mettre à jour une liste' })
    @ApiResponse({ status: 200, description: 'Liste mise à jour', type: List })
    @ApiResponse({ status: 404, description: 'Liste non trouvée' })
    async updateList(@Param('id') id: string, @Body() updateListDto: UpdateListDto): Promise<List> {
        return this.listsService.update(id, updateListDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Supprimer une liste' })
    @ApiResponse({ status: 200, description: 'Liste supprimée' })
    @ApiResponse({ status: 404, description: 'Liste non trouvée' })
    async deleteList(@Param('id') id: string): Promise<void> {
        return this.listsService.delete(id);
    }
}
