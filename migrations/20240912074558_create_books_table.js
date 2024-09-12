/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('books', (table) => {
    table.increments('id').primary(); // Auto-incrementing ID
    table.string('title').notNullable(); // Required string field for book title
    table.text('description').nullable(); // Optional description field
    table.date('published_date').notNullable(); // Required date field for publication date
    table
      .integer('author_id') // Foreign key field
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('authors')
      .onDelete('CASCADE'); // If an author is deleted, delete their books
    table.timestamps(true, true); // Timestamps for created_at and updated_at
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('books');
};
