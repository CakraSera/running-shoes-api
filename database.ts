import * as pg from "pg";

const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
});

await client.connect();

const res = await client.query("SELECT * FROM Brands");

const dataBrands = res.rows;
console.log({ dataBrands });

await client.end();
