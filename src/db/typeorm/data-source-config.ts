import "dotenv/config";
import { DataSource, DataSourceOptions } from "typeorm";

const config: DataSourceOptions = {
    type: "postgres",
    url: process.env.DATABASE_URL,
    logging: process.env.DEBUG_ORM === 'true',
    ssl: {
        rejectUnauthorized: false,
    },

    // entities: [],
    // migrations: [],
};

export const dataSource = new DataSource(config);