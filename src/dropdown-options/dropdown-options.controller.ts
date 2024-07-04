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
import { TaskFieldDropdownOption } from '@prisma/client';

import {
  CheckOwnershipInBody,
  CheckOwnershipInParams,
} from 'src/casl/check-ownership.decorator';
import { DropdownOptionsService } from './dropdown-options.service';
import { CreateDropdownOptionDto } from './dto/create-dropdown-option.dto';
import { DropdownOptionDto } from './dto/dropdown-option.dto';
import { UpdateDropdownOptionDto } from './dto/update-dropdown-option.dto';

@Controller('task-field-dropdown-options')
@ApiTags('task-field-dropdown-options')
@ApiBearerAuth()
export class DropdownOptionsController {
  constructor(
    private readonly dropdownOptionsService: DropdownOptionsService,
  ) {}

  @Post()
  @CheckOwnershipInBody('TaskField')
  @ApiOperation({ summary: 'Create a dropdown option in a custom task field' })
  @ApiCreatedResponse({ type: DropdownOptionDto })
  async create(
    @Body() createDropdownOptionDto: CreateDropdownOptionDto,
  ): Promise<TaskFieldDropdownOption> {
    return this.dropdownOptionsService.create(createDropdownOptionDto);
  }

  @Patch(':id')
  @CheckOwnershipInParams('TaskFieldDropdownOption')
  @ApiOperation({ summary: 'Update dropdown option details' })
  @ApiOkResponse({ type: DropdownOptionDto })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDropdownOptionDto: UpdateDropdownOptionDto,
  ): Promise<TaskFieldDropdownOption> {
    return this.dropdownOptionsService.update(id, updateDropdownOptionDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @CheckOwnershipInParams('TaskFieldDropdownOption')
  @ApiOperation({ summary: 'Delete a dropdown option' })
  @ApiNoContentResponse()
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.dropdownOptionsService.remove(id);
  }
}
