import { EntityRepository, Repository } from "typeorm";
import { CreateVehicleDto } from "./dtos/create-vehicle.dto";
import { Vehicle } from "./vehicle.entity";

@EntityRepository(Vehicle)
export class VehiclesRepository extends Repository<Vehicle>{
    async createVehicle({
        plate, 
        brand, 
        version, 
        year, 
        model
    }: CreateVehicleDto): Promise<Vehicle>{
        
        const vehicle = this.create({
            plate,
            brand,
            version,
            year,
            model,
        });
        
        await this.save(vehicle);
        return vehicle;
    }

    async findByPlate(plate: string): Promise<Vehicle> {
        const vehicle = await this.findOne({ plate });
        return vehicle;
    }

    async findVehicleById(id: string): Promise<Vehicle> {
        const vehicle = await this.findOne(id);
        return vehicle;
    }

    async listVehicles(): Promise<Vehicle[]> {
        const vehicles = await this.find();
        return vehicles;
    }

    async updateVehicle(id: string, data: CreateVehicleDto): Promise<Vehicle> {
        await this.update(id, data);
    
        const updatedVehicle = await this.findOne(id);
        return updatedVehicle;
    }

}