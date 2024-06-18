import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { List } from '@prisma/client';

import {
  CheckOwnership,
  CheckOwnershipInParams,
} from 'src/casl/check-ownership.decorator';
import { CreateListDto } from './dto/create-list.dto';
import { ListDto } from './dto/list.dto';
import { MoveListDto } from './dto/move-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { ListsService } from './lists.service';

@Controller('lists')
@ApiTags('lists')
@ApiBearerAuth()
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Post()
  @CheckOwnership({ subject: 'Project', store: 'body', id: 'projectId' })
  @ApiOperation({ summary: 'Create a new list in a project' })
  @ApiCreatedResponse({ type: ListDto })
  async create(@Body() createListDto: CreateListDto): Promise<List> {
    return this.listsService.create(createListDto);
  }

  @Patch(':id')
  @CheckOwnershipInParams('List')
  @ApiOperation({ summary: 'Update list details' })
  @ApiOkResponse({ type: ListDto })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateListDto: UpdateListDto,
  ): Promise<List> {
    return this.listsService.update(id, updateListDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @CheckOwnershipInParams('List')
  @ApiOperation({ summary: 'Delete a list' })
  @ApiNoContentResponse()
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.listsService.remove(id);
  }

  @Patch(':id/move')
  @CheckOwnershipInParams('List')
  @ApiOperation({ summary: 'Move a list to another position' })
  @ApiOkResponse({ type: ListDto })
  async move(
    @Param('id', ParseIntPipe) id: number,
    @Body() moveListDto: MoveListDto,
  ): Promise<List> {
    return this.listsService.move(id, moveListDto);
  }
}
