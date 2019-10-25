require("dotenv").config();

module.exports = {
  migrationDirectory: "migrations",
  driver: "pg",
  host: process.env.PROD_MIGRATION_DB_HOST_3,
  port: process.env.PROD_MIGRATION_DB_PORT_3,
  database: process.env.PROD_MIGRATION_DB_NAME_3,
  username: process.env.PROD_MIGRATION_DB_USER_3,
  password: process.env.PROD_MIGRATION_DB_PASS_3,
  ssl: true
};
