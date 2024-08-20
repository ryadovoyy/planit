# planit

A Trello clone REST API written with NestJS and Prisma.

## Setup

### Cloning

```bash
git clone https://github.com/ryadovoyy/planit.git
cd planit
```

### Environment variables

Copy the env example file and change variables if you want:

```bash
cp .env.example .env
```

### Dependencies

```bash
npm install
```

## Running the app

Start in development mode and apply migrations:

```bash
npm run docker:db
npm run start:dev
npm run migrate:dev
```

## Documentation

By default, you can see the Swagger API description on `localhost:3000/api` in your browser.
