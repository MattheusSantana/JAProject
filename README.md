# JAProject

### `npm i`

Install all packages from package.json

### Create Postgres database
This application connects with a simple local postgres database. So you will need to create a simple database called postgres. Follow above its configurations:
    username: "postgres",
    password: "postgres",
    database: "projects",
    host: "localhost",
    dialect: "postgres",

### `npx sequelize-cli db:migrate`
Run all migrations from sequelize


### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:4000](http://localhost:4000) to view it in your browser.
