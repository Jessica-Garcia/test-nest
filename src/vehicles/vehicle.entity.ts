import { 
    BaseEntity, 
    Column, 
    CreateDateColumn, 
    Entity, 
    PrimaryGeneratedColumn, 
    Unique, 
    UpdateDateColumn 
} from "typeorm";

@Entity()
@Unique(['plate'])
export class Vehicle extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, type: 'varchar'})
    plate: string;
  
    @Column({ nullable: false, type: 'varchar'})
    brand: string;
  
    @Column({ nullable: false, type: 'varchar'})
    model: string;
  
    @Column({ nullable: false, type: 'varchar'})
    version: string;
  
    @Column({ nullable: false, type: 'int'})
    year: number;
  
    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}