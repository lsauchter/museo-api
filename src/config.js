module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || "development",
  DATABASE_URL_1: process.env.DATABASE_URL,
  DATABASE_URL_2: process.env.HEROKU_POSTGRESQL_BLACK_URL,
  DATABASE_URL_3: process.env.HEROKU_POSTGRESQL_NAVY_URL,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN
};
