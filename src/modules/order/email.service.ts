import { BeforeApplicationShutdown, Injectable, OnApplicationShutdown, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

@Injectable()
export class EmailService implements OnModuleInit, OnModuleDestroy, BeforeApplicationShutdown, OnApplicationShutdown {
  onModuleInit() {
    console.log(`Email Service Started`);
  }

  sendOrderEmail(order) {
    console.log(`📧 Email sent for Order #${order.id}`);
  }

  onModuleDestroy() {
    console.log('Email worker stopped');
  }

  beforeApplicationShutdown(signal?: string) {
    console.log(`Closing Email Connection`);
  }

  onApplicationShutdown(signal?: string) {
    console.log(`Email Service Stopped`);
    
  }
}
