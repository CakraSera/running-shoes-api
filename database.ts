import * as pg from "pg";

const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
});

await client.connect();

async function getSelectQuery(table: string): Promise<any[]> {
  // Ideally, validate table name against a whitelist
  if (!table || typeof table !== "string") {
    throw new Error("Invalid table name");
  }

  const response = await client.query(`SELECT * FROM ${table}`);
  return response.rows;
}

async function insertInto(
  table: string,
  data: Record<string, any>
): Promise<void> {
  if (!table || typeof table !== "string") {
    throw new Error("Invalid table name");
  }
  if (!data || typeof data !== "object") {
    throw new Error("Invalid data object");
  }

  const columns = Object.keys(data);
  const values = Object.values(data);
  const placeholders = columns.map((_, i) => `$${i + 1}`).join(", ");

  const query = `INSERT INTO ${table} (${columns.join(
    ", "
  )}) VALUES (${placeholders})`;
  await client.query(query, values);
  console.log(`Inserted into ${table}:`, data);
}

async function main() {
  console.log(await getSelectQuery("Brands"));
  await insertInto("Brands", {
    name: "New Balance",
    description: "American sports footwear brand",
    website_url: "https://www.newbalance.com",
    founded_year: 1906,
    logo_url: "https://example.com/logos/newbalance.png",
    updated_at: new Date(), // Use new Date() for timestamps
  });
  await client.end();
}

main().catch(console.error);
