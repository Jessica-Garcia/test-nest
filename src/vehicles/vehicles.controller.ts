import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateVehicleDto } from './dtos/create-vehicle.dto';
import { ReturnVehicleDto } from './dtos/return-vehicle.dto';
import { Vehicle } from './vehicle.entity';
import { VehiclesService } from './vehicles.service';

@Controller('vehicles')
export class VehiclesController {
    constructor(private vehiclesService: VehiclesService){}

    @Post()
    async handleCreateVehicle(
        @Body() createVehicleDto: CreateVehicleDto
    ): Promise<ReturnVehicleDto>{
        const vehicle = await this.vehiclesService.executeCreateVehicle(createVehicleDto);
        return {
            vehicle,
            message: 'The Vehicle was created',
        };
    }

    @Get(':id')
    async handleFindVehicleById(@Param('id') id): Promise<Vehicle> {
        const vehicle = await this.vehiclesService.executeFindVehicleById(id);
        return vehicle;
    }
}
