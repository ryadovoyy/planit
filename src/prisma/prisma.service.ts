import { Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, 'query'>
  implements OnModuleInit
{
  constructor() {
    let log: (Prisma.LogLevel | Prisma.LogDefinition)[];

    if (process.env.NODE_ENV === 'development') {
      log = [
        {
          emit: 'event',
          level: 'query',
        },
        {
          emit: 'stdout',
          level: 'info',
        },
        {
          emit: 'stdout',
          level: 'warn',
        },
        {
          emit: 'stdout',
          level: 'error',
        },
      ];
    } else {
      log = ['error'];
    }

    super({ log });
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();

    this.$on('query', (e) => {
      console.log(`Query: ${e.query}`);
      console.log(`Params: ${e.params}`);
      console.log(`Duration: ${e.duration}ms\n`);
    });
  }
}
