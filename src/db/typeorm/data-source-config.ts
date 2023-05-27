import "dotenv/config";
import { DataSource, DataSourceOptions } from "typeorm";
import { UserEntity } from "./entities/user.entity";
import { TaskEntity } from "./entities/task.entity";

const config: DataSourceOptions = {
    type: "postgres",
    url: process.env.DATABASE_URL,
    logging: process.env.DEBUG_ORM === 'true',
    ssl: {
        rejectUnauthorized: false,
    },

    entities: [UserEntity, TaskEntity],
    migrations: ['db/typeorm/migrations/*.js'],
};

export const dataSource = new DataSource(config);