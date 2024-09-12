/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.table("authors", (table) => {
    table.string("password").notNullable(); // Adding the password field
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.table("authors", (table) => {
    table.dropColumn("password"); // Drop the password field in case of rollback
  });
};
