import {
  BeforeApplicationShutdown,
  Injectable,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseService
  implements OnApplicationBootstrap, BeforeApplicationShutdown
{
  constructor(private dataSource: DataSource) {}

  async onApplicationBootstrap() {
    try {
      if (this.dataSource.isInitialized) {
        console.log('Database connected');
      } else {
        await this.dataSource.initialize();
        console.log('Database initialized');
      }
    } catch (error) {
      console.error('Database connection failed');
      console.error(error);
      process.exit(1);
    }
  }

  async beforeApplicationShutdown(signal?: string) {
    if (this.dataSource.isInitialized) {
      await this.dataSource.destroy();
      console.log('Database connection closed');
    }
  }
}
