import { PrismaClient } from "../src/generated/prisma";
import { dataShoes as shoes } from "../data/shoes";
import { dataBrands as brands } from "../data/brands";

const prisma = new PrismaClient();

async function insertShoes() {
  for (const shoe of shoes) {
    await prisma.shoes.upsert({
      data: {
        brandId: shoe.brandId,
        name: shoe.name,
        generation: shoe.generation,
        releaseDate: new Date(shoe.releaseDate),
        description: shoe.description,
        category: shoe.category,
        terrain: shoe.terrain,
        bestFor: shoe.bestFor,
        imageUrl: shoe.imageUrl,
      },
    });
  }
}

async function main() {
  await prisma.shoes.deleteMany({});
  await prisma.brand.deleteMany({});
  console.log("Seeding shoes data...");
  await prisma.brand.createMany({
    data: brands,
    skipDuplicates: true,
  });
  await insertShoes();
  console.log("Seeding completed successfully!");
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
