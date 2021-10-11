import { Body, Controller, Post } from '@nestjs/common';
import { CreateVehicleDto } from './dtos/create-vehicle.dto';
import { ReturnVehicleDto } from './dtos/return-vehicle.dto';
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
}
