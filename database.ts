import { PrismaClient } from "./src/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  // ... you will write your Prisma Client queries here
  const allShoes = await prisma.brand.findMany();
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
