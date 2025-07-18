import { PrismaClient } from "./src/generated/prisma";
import { getAllShoeWithBrand } from "./src/generated/prisma/sql";
const prisma = new PrismaClient();

async function main() {
  // ... you will write your Prisma Client queries here
  const allShoes = await prisma.$queryRawTyped(getAllShoeWithBrand());
  console.log("🚀 ~ main ~ brand:", allShoes);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
