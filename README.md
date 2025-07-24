# Running Shoes API

Welcome to the Running Shoes API! This project was born out of a passion for running and a desire to make it easier for runners, enthusiasts, and collectors to manage and explore a world of running shoes. Whether you're tracking your own collection, building a shoe review site, or just curious about the latest releases, this API is designed to be your foundation.

## API Endpoints

### Shoes

| Method | Endpoint      | Description           |
| ------ | ------------- | --------------------- |
| GET    | /shoes        | Get all running shoes |
| POST   | /shoes        | Add new shoe          |
| DELETE | /shoes        | Delete all shoes      |
| GET    | /shoes/{slug} | Get shoe by slug      |
| DELETE | /shoes/{id}   | Delete shoe by id     |
| PATCH  | /shoes/{id}   | Update shoe by id     |

### Brands

| Method | Endpoint             | Description             |
| ------ | -------------------- | ----------------------- |
| GET    | /brands              | Get all brands          |
| GET    | /brands/{slug}       | Get brand by slug       |
| GET    | /brands/{slug}/shoes | Get shoes by brand slug |

For more detail: [https://running-shoes.cakrasera.com/scalar](https://running-shoes.cakrasera.com/scalar)

Every great API starts with a solid foundation. The database schema for this project is thoughtfully designed to capture the essential details about shoes and brands. Curious about the structure? Check out the schema diagram here: [View Database Design](https://dbdiagram.io/d/Running-Shoes-68634226f413ba35089eb281)

## Getting Started: Your First Steps

Ready to lace up and start using the API? Follow these simple steps:

1. **Install dependencies:**

   ```sh
   bun install
   ```

2. **Run the development server:**

   ```sh
   bun run dev
   ```

3. **Open your browser and visit:**

   [http://localhost:3000](http://localhost:3000)

Now you're ready to explore, build, and create with the Running Shoes API. Happy running!
