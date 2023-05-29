import "dotenv/config";
import { DataSource, DataSourceOptions } from "typeorm";
import { UserEntity } from "../../app/shared/database/entities/user.entity";
import { TaskEntity } from "../../app/shared/database/entities/task.entity";
import { CreateUserTable1685280044155 } from "../../app/shared/database/migrations/1685280044155-CreateUserTable";

export const config: DataSourceOptions = {
    type: "postgres",
    url: process.env.DATABASE_URL,
    logging: true,
    ssl: { rejectUnauthorized: false },
    entities: [UserEntity, TaskEntity],
    migrations: [
        //'app/shared/database/migrations/*.js',
        CreateUserTable1685280044155,
        
    ],
};

export const dataSource = new DataSource(config);