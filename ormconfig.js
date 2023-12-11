const path = require('path')
const file = (filename) => path.resolve(__dirname, filename);

// By default, we get entities from the build folder. This is used when starting the server
// When we are running jest, we pull entities from ts because we use ts-jest
const entities = [
    process.env.IS_RUNNING_FROM_JEST
      ? file('src/entities/**/*.ts')
      : file('build/entities/**/*.js')
];

const migrations =
  process.env.IS_RUNNING_MIGRATIONS
    ? [file('build/migrations/**/*.js')]
    : [];

    module.exports = {
        entities,
        migrations,
        type: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        synchronize: false,
        cli: {
          migrationsDir: 'src/migrations'
        },
    };