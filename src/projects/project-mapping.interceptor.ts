import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Observable, map } from 'rxjs';

import { ProjectWithListsAndTasksDto } from './dto/project-with-lists-and-tasks.dto';
import { ProjectWithListsAndTasks } from './projects.types';

@Injectable()
export class ProjectMappingInterceptor
  implements
    NestInterceptor<ProjectWithListsAndTasks, ProjectWithListsAndTasksDto>
{
  intercept(
    _context: ExecutionContext,
    next: CallHandler<ProjectWithListsAndTasks>,
  ): Observable<ProjectWithListsAndTasksDto> {
    return next.handle().pipe(
      map((project) => {
        const projectDto = plainToInstance(
          ProjectWithListsAndTasksDto,
          project,
        );

        projectDto.lists.forEach((list) => {
          list.tasks.forEach((task) => {
            task.customFieldValues = [
              ...task.fieldNumericValues,
              ...task.fieldStringValues,
              ...task.fieldDropdownValues,
            ];
          });
        });

        return projectDto;
      }),
    );
  }
}
