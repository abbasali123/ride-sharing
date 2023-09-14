const typeOrm = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "abbas",
  password: "Password123!",
  database: "ride_sharing",
  entities: ["dist/**/*.entity{.ts,.js}"],
  synchronize: false,
  migrations: ["dist/migrations/*{.ts,.js}"],
  migrationsTableName: "migrations_typeorm",
  migrationsRun: true,
  logging: true,
};

module.exports = {
  typeOrm
};
