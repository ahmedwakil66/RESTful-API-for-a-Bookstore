import knex from "../db";

export const validateAuthorExists = async (author_id: number) => {
  const author = await knex("authors").where({ id: author_id }).first();
  if (!author) {
    throw new Error("Author does not exist against given author_id");
  }
  return true;
};
