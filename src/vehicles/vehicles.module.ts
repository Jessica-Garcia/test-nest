import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiclesRepository } from './vehicles.repository';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';

@Module({
    imports: [TypeOrmModule.forFeature([VehiclesRepository])],
    providers: [VehiclesService],
    controllers: [VehiclesController],
})
export class VehiclesModule {}
