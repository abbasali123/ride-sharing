import { registerAs } from "@nestjs/config";
import { config as dotenvConfig } from "dotenv";
import { DataSource, DataSourceOptions } from "typeorm";

dotenvConfig({ path: ".env" });

const config = {
  type: "postgres",
  host: `${process.env.DATABASE_HOST}` || 'localhost',
  port: `${process.env.DATABASE_PORT}` || 5432,
  username: `${process.env.DATABASE_USERNAME}` || 'abbas',
  password: `${process.env.DATABASE_PASSWORD}` || 'Password123!',
  database: `${process.env.DATABASE_NAME}` || 'ride_sharing',
  entities: ["dist/**/*.entity{.ts,.js}"],
  seeds: ["dist/**/*.seed{.ts,.js}"],
  migrations: ["dist/migrations/*{.ts,.js}"],
  autoLoadEntities: true,
  synchronize: false,
  migrationsTableName: "migrations_typeorm",
  migrationsRun: true,
  logging: true,
};

export default registerAs("typeorm", () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
