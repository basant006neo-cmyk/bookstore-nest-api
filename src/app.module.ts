import { BeforeApplicationShutdown, Module, OnApplicationBootstrap, OnApplicationShutdown, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './config/database.config';
import { BooksModule } from './modules/books/books.module';
import { OrderModule } from './modules/order/order.module';
import { AddressModule } from './modules/address/address.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseService } from './config/database.service';
// import { APP_GUARD } from '@nestjs/core';
// import { JwtAuthGuard } from './modules/auth/jwt.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // TypeOrmModule.forRootAsync(dbConfig),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: dbConfig,
    }),
    AuthModule,
    UsersModule,
    BooksModule,
    OrderModule,
    AddressModule,
  ],
  controllers: [AppController],
  providers: [DatabaseService
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
  ],
})
export class AppModule implements OnModuleInit, OnApplicationBootstrap, OnModuleDestroy, BeforeApplicationShutdown, OnApplicationShutdown {
  onModuleInit() {
    console.log(`App Module Loaded`);
  }

  onApplicationBootstrap() {
    console.log('Booknest API Started');
  }

  onModuleDestroy() {
    console.log(`App Module Destroying...`);
    
  }

  beforeApplicationShutdown(signal?: string) {
    console.log(`All Connection closing...`);
    
  }

  onApplicationShutdown(signal?: string) {
      console.log(`BookNest is shutdown`);      
  }
  
}
