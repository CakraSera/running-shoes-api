import { PrismaClient } from "../src/generated/prisma";
import { dataShoes } from "../src/data/shoes";
import { dataBrands } from "../src/data/brands";
import { createSlug } from "../src/lib/slug";

const prisma = new PrismaClient();

async function main() {
  await seedBrands();
  await seedShoes();
}

async function seedBrands() {
  for (const brand of dataBrands) {
    await prisma.brand.upsert({
      where: {
        name: brand.name,
      },
      update: {},
      create: {
        ...brand,
        slug: createSlug(brand.name),
      },
    });

    // TODO: log
  }
}

async function seedShoes() {
  for (const shoe of dataShoes) {
    const upsertedShoe = await prisma.shoe.upsert({
      where: {
        name: shoe.name,
      },
      update: {},
      create: {
        slug: createSlug(shoe.name),
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

    console.log(`👟 Shoe: ${upsertedShoe.name}`);
  }
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
