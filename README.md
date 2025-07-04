# Running Shoes API

## Rest API Specification

| Endpoint    | HTTP   | Description           |
| ----------- | ------ | --------------------- |
| /shoes      | GET    | Get all running shoes |
| /shoes/{id} | GET    | Get shoe by id        |
| /shoes      | POST   | Add new shoe          |
| /shoes      | DELETE | Delete all shoes      |
| /shoes/{id} | DELETE | Delete shoe by id     |
| /shoes/{id} | PATCH  | Update shoe by id     |

## Design the database schema

Link Design: [link](https://dbdiagram.io/d/Running-Shoes-68634226f413ba35089eb281)

## Getting Started

To install dependencies:

```sh
bun install
```

To run:

```sh
bun run dev
```

open http://localhost:3000
