import { z } from "zod";

export const BrandSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1).max(100),
  description: z.string().min(1).max(500).optional(),
  website_url: z.string().url().optional(),
  founded_year: z.number().int().positive().optional(),
  logoUrl: z.string().url().optional(),
});

export type Brand = z.infer<typeof BrandSchema>;

export const dataBrands: Brand[] = [
  {
    id: 1,
    name: "Salomon",
    description:
      "French outdoor sports equipment company specializing in trail running and hiking gear.",
    website_url: "https://www.salomon.com",
    founded_year: 1947,
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Salomon_Group_logo.svg/1200px-Salomon_Group_logo.svg.png",
  },
  {
    id: 2,
    name: "ASICS",
    description:
      "Japanese multinational corporation which produces footwear and sports equipment.",
    website_url: "https://www.asics.com",
    founded_year: 1949,
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/ASICS_logo.svg/1200px-ASICS_logo.svg.png",
  },
  {
    id: 3,
    name: "Nike",
    description:
      "American multinational corporation that is engaged in the design, development, manufacturing, and worldwide marketing of footwear.",
    website_url: "https://www.nike.com",
    founded_year: 1964,
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Nike_Logo.svg/1200px-Nike_Logo.svg.png",
  },
  {
    id: 4,
    name: "Adidas",
    description:
      "German multinational corporation, founded and headquartered in Herzogenaurach, Germany, that designs and manufactures shoes, clothing and accessories.",
    website_url: "https://www.adidas.com",
    founded_year: 1949,
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/1200px-Adidas_Logo.svg.png",
  },
  {
    id: 5,
    name: "Puma",
    description:
      "German multinational corporation that designs and manufactures athletic and casual footwear, apparel and accessories.",
    website_url: "https://www.puma.com",
    founded_year: 1948,
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Puma_logo.svg/1200px-Puma_logo.svg.png",
  },
  {
    id: 6,
    name: "Reebok",
    description:
      "British-American footwear and apparel company that is a subsidiary of Authentic Brands Group.",
    website_url: "https://www.reebok.com",
    founded_year: 1958,
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Reebok_logo.svg/1200px-Reebok_logo.svg.png",
  },
  {
    id: 7,
    name: "New Balance",
    description:
      "American multinational corporation that designs and manufactures athletic shoes and apparel.",
    website_url: "https://www.newbalance.com",
    founded_year: 1906,
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/New_Balance_logo.svg/1200px-New_Balance_logo.svg.png",
  },
  {
    id: 8,
    name: "Brooks",
    description:
      "American sports equipment company that designs and markets running shoes, clothing and accessories.",
    website_url: "https://www.brooksrunning.com",
    founded_year: 1914,
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Brooks_Running_logo.svg/1200px-Brooks_Running_logo.svg.png",
  },
  {
    id: 9,
    name: "Saucony",
    description:
      "American athletic shoe company that specializes in running shoes.",
    website_url: "https://www.saucony.com",
    founded_year: 1898,
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Saucony_logo.svg/1200px-Saucony_logo.svg.png",
  },
  {
    id: 10,
    name: "Hoka",
    description:
      "American footwear company that designs and manufactures running shoes.",
    website_url: "https://www.hoka.com",
    founded_year: 2009,
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Hoka_logo.svg/1200px-Hoka_logo.svg.png",
  },
  {
    id: 11,
    name: "Mizuno",
    description: "Japanese sports equipment and sportswear company.",
    website_url: "https://www.mizuno.com",
    founded_year: 1906,
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Mizuno_logo.svg/1200px-Mizuno_logo.svg.png",
  },
  {
    id: 12,
    name: "Under Armour",
    description:
      "American sports equipment company that manufactures footwear, sports and casual apparel.",
    website_url: "https://www.underarmour.com",
    founded_year: 1996,
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Under_Armour_logo.svg/1200px-Under_Armour_logo.svg.png",
  },
  {
    id: 13,
    name: "Altra",
    description:
      "American footwear company that specializes in running shoes with a foot-shaped toe box.",
    website_url: "https://www.altrarunning.com",
    founded_year: 2011,
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Altra_logo.svg/1200px-Altra_logo.svg.png",
  },
  {
    id: 14,
    name: "Merrell",
    description:
      "American footwear company that specializes in hiking and outdoor footwear.",
    website_url: "https://www.merrell.com",
    founded_year: 1981,
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Merrell_logo.svg/1200px-Merrell_logo.svg.png",
  },
];
