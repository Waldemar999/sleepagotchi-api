# sleepagotchi-api

sleepagotchi-api is REST API written on Node.js with user creation and simple authentication.

## Installation

1. Use the npm to install dependencies.

```bash
npm install
```

2. Create .env file (for reference see .env.example) and generate secret key.

3. Setup local.json file and connect to the database.

## Usage

Use `npm start` to run API in development mode.

```bash
npm start
```

Use `npm run start:prod` to run API in production mode.

```bash
npm run start:prod
```

Use `npm run migrate` to run first migration which creates initial database tables.

```bash
npm run migrate
```

Also you can find Swagger documentation at 'http://localhost:8080/api-docs'