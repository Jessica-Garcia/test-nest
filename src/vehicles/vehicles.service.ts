import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateVehicleDto } from './dtos/create-vehicle.dto';
import { Vehicle } from './vehicle.entity';
import { VehiclesRepository } from './vehicles.repository';

@Injectable()
export class VehiclesService {
    constructor(
        @InjectRepository(VehiclesRepository)
        private vehiclesRepository: VehiclesRepository,
    ){}

    async executeCreateVehicle({
        plate, 
        brand, 
        version, 
        model, 
        year
      }: CreateVehicleDto): Promise<Vehicle> {
        const vehicleAlreadyRegistered = await this.vehiclesRepository.findByPlate(plate);
    
        if(vehicleAlreadyRegistered){
          throw new HttpException({
              status: HttpStatus.BAD_REQUEST,
              error: 'Vehicle already registered!',
          }, HttpStatus.BAD_REQUEST);
        }
    
        const vehicle = await this.vehiclesRepository.createVehicle({
          plate, 
          brand, 
          version, 
          model, 
          year
        });

        return vehicle
    }
}
