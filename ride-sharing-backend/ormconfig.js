module.exports = [
  {
    type: process.env.DATABASE_TYPE || "postgres",
    url: process.env.DATABASE_TYPE + '://' + process.env.DATABASE_USERNAME + ':' + process.env.DATABASE_PASSWORD + '@' + process.env.DATABASE_HOST + ':' + process.env.DATABASE_PORT + '/' + process.env.DATABASE_NAME,
    synchronize: false,
    migrations: ["dist/migrations/*{.ts,.js}"],
    entities: ["dist/**/*.entity{.ts,.js}"],
    seeds: ["dist/**/*.seed{.ts,.js}"],
    cli: {
      migrationsDir: "src/migrations"
    },
    ssl: false
  },
]
