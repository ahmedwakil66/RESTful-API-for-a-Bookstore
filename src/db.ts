import Knex from 'knex';
import knexConfig from './knexfile';
const environment = process.env.NODE_ENV || 'development';
console.log('knexConfig', knexConfig);

const knex = Knex(knexConfig[environment]);

export default knex;
