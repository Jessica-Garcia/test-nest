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

    
    async executeFindVehicleById(vehicleId: string):Promise<Vehicle>{
        const vehicle = await this.vehiclesRepository.findVehicleById(vehicleId);
        if(!vehicle){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Vehicle not found',
            }, HttpStatus.NOT_FOUND);
        }
      
        return vehicle;
    }
    
    async executeListVehicles(): Promise<Vehicle[]>{
        const vehicles = await this.vehiclesRepository.listVehicles();
        return vehicles;
    }

    async executeUpdateVehicle(vehicleId: string , data: CreateVehicleDto ): Promise<Vehicle> {
        const vehicle = await this.vehiclesRepository.findVehicleById(vehicleId);
        const { plate } = data;
        
        if(!vehicle){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Vehicle not found',
            }, HttpStatus.NOT_FOUND);
        }
    
        if(vehicle.plate !== plate){
          const plateAlreadyExists = await this.vehiclesRepository.findByPlate(plate);
          
          if(plateAlreadyExists){
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Vehicle already registered!',
            }, HttpStatus.BAD_REQUEST);
          }
        }
    
        const updatedVehicle = await this.vehiclesRepository.updateVehicle(vehicleId, data);
        return updatedVehicle;
    }

    async executeDeleteVehicle( id: string): Promise<void>{
        const vehicle = await this.vehiclesRepository.findVehicleById(id);
        
        if(!vehicle){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Vehicle not found',
            }, HttpStatus.NOT_FOUND); 
        }
    
        const deletedVehicle = await this.vehiclesRepository.delete(id);
    
        if(deletedVehicle.affected < 1){
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'An Error has ocurred! Try again',
            }, HttpStatus.BAD_REQUEST);
        }
    }
}
