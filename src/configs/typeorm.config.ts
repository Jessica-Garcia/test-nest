import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: "postgres",
    port: 5432,
    host: "localhost",
    username: "docker",
    password: '1234',
    database: "test",
    entities: [__dirname + "/../**/*.entity.{js,ts}"],
    synchronize: true,
}