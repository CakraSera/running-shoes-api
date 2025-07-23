import { z } from "@hono/zod-openapi";

import { BrandSchema, SeedBrandSchema } from "../schemas/brand-schema";

export type Brand = z.infer<typeof BrandSchema>;
export type SeedBrand = z.infer<typeof SeedBrandSchema>;

export const dataBrands: SeedBrand[] = [
  {
    slug: "salomon",
    name: "Salomon",
    description:
      "French outdoor sports equipment company specializing in trail running and hiking gear.",
    websiteUrl: "https://www.salomon.com",
    foundedYear: 1947,
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Salomon_Group_logo.svg/1200px-Salomon_Group_logo.svg.png",
  },
  {
    slug: "asics",
    name: "ASICS",
    description:
      "Japanese multinational corporation which produces footwear and sports equipment.",
    websiteUrl: "https://www.asics.com",
    foundedYear: 1949,
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/ASICS_logo.svg/1200px-ASICS_logo.svg.png",
  },
  {
    slug: "nike",
    name: "Nike",
    description:
      "American multinational corporation that is engaged in the design, development, manufacturing, and worldwide marketing of footwear.",
    websiteUrl: "https://www.nike.com",
    foundedYear: 1964,
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Nike_Logo.svg/1200px-Nike_Logo.svg.png",
  },
  {
    slug: "adidas",
    name: "Adidas",
    description:
      "German multinational corporation, founded and headquartered in Herzogenaurach, Germany, that designs and manufactures shoes, clothing and accessories.",
    websiteUrl: "https://www.adidas.com",
    foundedYear: 1949,
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/1200px-Adidas_Logo.svg.png",
  },
  {
    slug: "puma",
    name: "Puma",
    description:
      "German multinational corporation that designs and manufactures athletic and casual footwear, apparel and accessories.",
    websiteUrl: "https://www.puma.com",
    foundedYear: 1948,
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Puma_logo.svg/1200px-Puma_logo.svg.png",
  },
  {
    slug: "reebok",
    name: "Reebok",
    description:
      "British-American footwear and apparel company that is a subsidiary of Authentic Brands Group.",
    websiteUrl: "https://www.reebok.com",
    foundedYear: 1958,
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Reebok_logo.svg/1200px-Reebok_logo.svg.png",
  },
  {
    slug: "new-balance",
    name: "New Balance",
    description:
      "American multinational corporation that designs and manufactures athletic shoes and apparel.",
    websiteUrl: "https://www.newbalance.com",
    foundedYear: 1906,
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/New_Balance_logo.svg/1200px-New_Balance_logo.svg.png",
  },
  {
    slug: "brooks",
    name: "Brooks",
    description:
      "American sports equipment company that designs and markets running shoes, clothing and accessories.",
    websiteUrl: "https://www.brooksrunning.com",
    foundedYear: 1914,
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Brooks_Running_logo.svg/1200px-Brooks_Running_logo.svg.png",
  },
  {
    slug: "saucony",
    name: "Saucony",
    description:
      "American athletic shoe company that specializes in running shoes.",
    websiteUrl: "https://www.saucony.com",
    foundedYear: 1898,
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Saucony_logo.svg/1200px-Saucony_logo.svg.png",
  },
  {
    slug: "hoka",
    name: "Hoka",
    description:
      "American footwear company that designs and manufactures running shoes.",
    websiteUrl: "https://www.hoka.com",
    foundedYear: 2009,
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Hoka_logo.svg/1200px-Hoka_logo.svg.png",
  },
  {
    slug: "mizuno",
    name: "Mizuno",
    description: "Japanese sports equipment and sportswear company.",
    websiteUrl: "https://www.mizuno.com",
    foundedYear: 1906,
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Mizuno_logo.svg/1200px-Mizuno_logo.svg.png",
  },
  {
    slug: "under-armour",
    name: "Under Armour",
    description:
      "American sports equipment company that manufactures footwear, sports and casual apparel.",
    websiteUrl: "https://www.underarmour.com",
    foundedYear: 1996,
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Under_Armour_logo.svg/1200px-Under_Armour_logo.svg.png",
  },
  {
    slug: "altra",
    name: "Altra",
    description:
      "American footwear company that specializes in running shoes with a foot-shaped toe box.",
    websiteUrl: "https://www.altrarunning.com",
    foundedYear: 2011,
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Altra_logo.svg/1200px-Altra_logo.svg.png",
  },
  {
    slug: "merrell",
    name: "Merrell",
    description:
      "American footwear company that specializes in hiking and outdoor footwear.",
    websiteUrl: "https://www.merrell.com",
    foundedYear: 1981,
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Merrell_logo.svg/1200px-Merrell_logo.svg.png",
  },
  {
    slug: "910-running",
    name: "910 Running",
    description:
      "Innovative running shoe brand known for its advanced cushioning technology and lightweight designs, popular among trail and road runners.",
    websiteUrl: "https://www.910running.com",
    foundedYear: 2015,
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/910_Running_logo.svg/1200px-910_Running_logo.svg.png",
  },
];
