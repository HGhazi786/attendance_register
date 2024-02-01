This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Install PostgreSQL

1. Install PostgreSQL on your device. You can download it from the [official PostgreSQL website](https://www.postgresql.org/download/).

### Create Database and Tables

2. Open a terminal and run the following commands to create the `attendance_record` database and tables:

# Create the database
```bash
createdb -U your_username -W your_password attendance_record
```
# Connect to the database
psql -U your_username -W your_password -d attendance_record

# Run the following queries to create tables
```sql
-- Table: employees
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    service_no INTEGER,
    name VARCHAR(100),
    email VARCHAR(100),
    designation VARCHAR(50),
    category VARCHAR(20)
);

-- Table: attendance_records
CREATE TABLE attendance_records (
    id SERIAL PRIMARY KEY,
    attendance_type VARCHAR(10) NOT NULL,
    reason TEXT,
    employee_id INTEGER REFERENCES employees(id),
    date DATE
);
```

### Copy Environment Variables
```
PGSQL_HOST= "127.0.0.1"
PGSQL_PORT= "5432"
PGSQL_DATABASE= "attendance-register||your_database_name"
PGSQL_USER= "your_username||by_default_it_is_postgres"
PGSQL_PASSWORD= "your_password"
JWT_SECRET="your_jwt"
API_BASE_URL="http://localhost:3000"
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Then build your app with:

```bash
npm run build
# or
yarn build
# or
pnpm build
# or
bun build
```

For local server:

```bash
npm run start
# or
yarn start
# or
pnpm start
# or
bun start
```


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
