import { PrismaClient } from "../src/generated/prisma";
import { dataShoes } from "../data/shoes";
import { dataBrands } from "../data/brands";

const prisma = new PrismaClient();

async function insertShoes() {
  for (const shoe of dataShoes) {
    await prisma.shoe.upsert({
      where: {
        name: shoe.name,
      },
      update: {},
      create: {
        slug: shoe.slug,
        name: shoe.name,
        generation: shoe.generation,
        releaseDate: new Date(shoe.releaseDate),
        description: shoe.description,
        category: shoe.category,
        terrain: shoe.terrain,
        bestFor: shoe.bestFor,
        imageUrl: shoe.imageUrl,
        Brand: {
          connect: {
            slug: shoe.brandSlug,
          },
        },
      },
    });
  }
}

async function main() {
  console.log("Starting seeding process...");
  await prisma.shoe.deleteMany({});
  await prisma.brand.deleteMany({});
  await prisma.brand.createMany({
    data: dataBrands,
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
