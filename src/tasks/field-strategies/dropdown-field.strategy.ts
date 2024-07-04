import { BadRequestException, Injectable } from '@nestjs/common';

import { AddCustomFieldValueDto } from '../dto/add-custom-field-value.dto';
import { CustomFieldQuery, FieldStrategy } from '../tasks.types';

@Injectable()
export class DropdownFieldStrategy implements FieldStrategy {
  addQuery(
    fieldData: AddCustomFieldValueDto,
    fieldQuery: CustomFieldQuery,
    taskId?: number,
  ): void {
    const { taskFieldId, dropdownOptionId } = fieldData;

    if (!dropdownOptionId) {
      throw new BadRequestException(
        `Dropdown option ID is required for custom field with ID: ${taskFieldId}`,
      );
    }

    if (!taskId) {
      if (!fieldQuery.fieldDropdownValues) {
        fieldQuery.fieldDropdownValues = {
          create: [],
        };
      }

      fieldQuery.fieldDropdownValues.create?.push({
        dropdownOption: {
          connect: { id: dropdownOptionId },
        },
        taskField: {
          connect: { id: taskFieldId },
        },
      });
    } else {
      if (!fieldQuery.fieldDropdownValues) {
        fieldQuery.fieldDropdownValues = {
          upsert: [],
        };
      }

      fieldQuery.fieldDropdownValues.upsert?.push({
        where: {
          taskFieldId_taskId: {
            taskFieldId,
            taskId,
          },
        },
        update: {
          dropdownOptionId,
        },
        create: {
          dropdownOption: {
            connect: { id: dropdownOptionId },
          },
          taskField: {
            connect: { id: taskFieldId },
          },
        },
      });
    }
  }
}
