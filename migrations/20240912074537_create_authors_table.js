/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('authors', (table) => {
    table.increments('id').primary(); // Auto-incrementing ID
    table.string('name').notNullable(); // Required string field for author name
    table.text('bio').nullable(); // Optional bio field
    table.date('birthdate').notNullable(); // Required date field for birthdate
    table.timestamps(true, true); // Timestamps for created_at and updated_at
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('authors');
};
