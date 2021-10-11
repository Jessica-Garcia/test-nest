import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { VehiclesModule } from './vehicles/vehicles.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), VehiclesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
