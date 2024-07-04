import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Observable, map } from 'rxjs';

import { TaskWithCustomFieldsDto } from './dto/task-with-custom-fields.dto';
import { TaskWithCustomFields } from './tasks.types';

@Injectable()
export class TaskMappingInterceptor
  implements NestInterceptor<TaskWithCustomFields, TaskWithCustomFieldsDto>
{
  intercept(
    _context: ExecutionContext,
    next: CallHandler<TaskWithCustomFields>,
  ): Observable<TaskWithCustomFieldsDto> {
    return next.handle().pipe(
      map((task) => {
        const taskDto = plainToInstance(TaskWithCustomFieldsDto, task);

        taskDto.customFieldValues = [
          ...task.fieldNumericValues,
          ...task.fieldStringValues,
          ...task.fieldDropdownValues,
        ];

        return taskDto;
      }),
    );
  }
}
