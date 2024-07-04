import { BadRequestException, Injectable } from '@nestjs/common';

import { AddCustomFieldValueDto } from '../dto/add-custom-field-value.dto';
import { CustomFieldQuery, FieldStrategy } from '../tasks.types';

@Injectable()
export class StringFieldStrategy implements FieldStrategy {
  addQuery(
    fieldData: AddCustomFieldValueDto,
    fieldQuery: CustomFieldQuery,
    taskId?: number,
  ): void {
    const { taskFieldId, value } = fieldData;

    if (!value) {
      throw new BadRequestException(
        `String value is required for custom field with ID: ${taskFieldId}`,
      );
    }

    if (!taskId) {
      if (!fieldQuery.fieldStringValues) {
        fieldQuery.fieldStringValues = {
          create: [],
        };
      }

      fieldQuery.fieldStringValues.create?.push({
        value,
        taskField: {
          connect: { id: taskFieldId },
        },
      });
    } else {
      if (!fieldQuery.fieldStringValues) {
        fieldQuery.fieldStringValues = {
          upsert: [],
        };
      }

      fieldQuery.fieldStringValues.upsert?.push({
        where: {
          taskFieldId_taskId: {
            taskFieldId,
            taskId,
          },
        },
        update: {
          value,
        },
        create: {
          value,
          taskField: {
            connect: { id: taskFieldId },
          },
        },
      });
    }
  }
}
