import { PureAbility } from '@casl/ability';
import { PrismaQuery, Subjects } from '@casl/prisma';
import { List, Project, Role, Task, User } from '@prisma/client';

type Action = 'manage' | 'create' | 'read' | 'update' | 'delete';

type SubjectList = {
  User: User;
  Role: Role;
  Project: Project;
  List: List;
  Task: Task;
};

export type AppSubject = Subjects<SubjectList> | 'all';
export type AppAbility = PureAbility<[Action, AppSubject], PrismaQuery>;

export interface Resource {
  subject: AppSubject;
  store: 'params' | 'body' | 'query';
  id: string;
  isOptional?: boolean;
}

export interface OwnershipStrategy {
  findSubjectWithUserId(subjectId: number): Promise<any>;
}
