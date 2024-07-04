import { BadRequestException, Injectable } from '@nestjs/common';

import { AddCustomFieldValueDto } from '../dto/add-custom-field-value.dto';
import { CustomFieldQuery, FieldStrategy } from '../tasks.types';

@Injectable()
export class NumericFieldStrategy implements FieldStrategy {
  addQuery(
    fieldData: AddCustomFieldValueDto,
    fieldQuery: CustomFieldQuery,
    taskId: number,
  ): void {
    const { taskFieldId, value } = fieldData;
    const parsedValue = parseFloat(value ?? '');

    if (isNaN(parsedValue)) {
      throw new BadRequestException(
        `Numeric string value is required for custom field with ID: ${taskFieldId}`,
      );
    }

    if (!taskId) {
      if (!fieldQuery.fieldNumericValues) {
        fieldQuery.fieldNumericValues = {
          create: [],
        };
      }

      fieldQuery.fieldNumericValues.create?.push({
        value: parsedValue,
        taskField: {
          connect: { id: taskFieldId },
        },
      });
    } else {
      if (!fieldQuery.fieldNumericValues) {
        fieldQuery.fieldNumericValues = {
          upsert: [],
        };
      }

      fieldQuery.fieldNumericValues.upsert?.push({
        where: {
          taskFieldId_taskId: {
            taskFieldId,
            taskId,
          },
        },
        update: {
          value: parsedValue,
        },
        create: {
          value: parsedValue,
          taskField: {
            connect: { id: taskFieldId },
          },
        },
      });
    }
  }
}
