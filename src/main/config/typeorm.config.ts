import "dotenv/config";
import { DataSource, DataSourceOptions } from "typeorm";
import { UserEntity } from "../../app/shared/database/entities/user.entity";
import { TaskEntity } from "../../app/shared/database/entities/task.entity";
import { CreateUserTable1685280044155 } from "../../app/shared/database/migrations/1685280044155-CreateUserTable";

export const config: DataSourceOptions = process.env.NODE_ENV === 'test'
    ?   {
        type: "sqlite",
        database: ":memory:",
        dropSchema: true,
        entities: [UserEntity, TaskEntity],
        migrations: [CreateUserTable1685280044155],
        synchronize: true,
        logging: false,
    }
    :   {
        type: "postgres",
        url: process.env.DATABASE_URL,
        logging: true,
        ssl: { rejectUnauthorized: false },
        entities: [UserEntity, TaskEntity],
        migrations: [CreateUserTable1685280044155],
    };

export const dataSource = new DataSource(config);