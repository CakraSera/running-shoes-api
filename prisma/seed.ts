import { PrismaClient } from "../src/generated/prisma";
import { dataShoes } from "../src/data/shoes";
import { dataBrands } from "../src/data/brands";
import { createSlug } from "../src/lib/slug";

const prisma = new PrismaClient();

async function main() {
  await insertBrands();
  await insertShoes();
}

async function insertShoes() {
  for (const shoe of dataShoes) {
    const upsertShoe = await prisma.shoe.upsert({
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
        brand: {
          connect: {
            slug: shoe.brandSlug,
          },
        },
      },
    });
    console.info(`Inserted or updated shoe: ${upsertShoe.name}`);
  }
}

async function insertBrands() {
  for (const brand of dataBrands) {
    const upsertBrand = await prisma.brand.upsert({
      where: {
        name: brand.name,
      },
      update: {},
      create: {
        ...brand,
        slug: createSlug(brand.name),
      },
    });
    console.info(`Inserted or updated brand: ${upsertBrand.name}`);
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
