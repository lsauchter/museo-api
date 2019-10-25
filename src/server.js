const knex = require("knex");
const app = require("./app");
const {
  PORT,
  DATABASE_URL_1,
  DATABASE_URL_2,
  DATABASE_URL_3
} = require("./config");

const db1 = knex({
  client: "pg",
  connection: DATABASE_URL_1
});

const db2 = knex({
  client: "pg",
  connection: DATABASE_URL_2
});

const db3 = knex({
  client: "pg",
  connection: DATABASE_URL_3
});

app.set("db1", db1);
app.set("db2", db2);
app.set("db3", db3);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
