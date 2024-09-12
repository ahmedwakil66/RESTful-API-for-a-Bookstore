import { Request, Response } from "express";
import knex from "../../db";

// GET /books
export const getAllBooks = async (req: Request, res: Response) => {
  const query = req.query;
  let pge = "1",
    lmt = "10";

  try {
    const booksQuery = knex("books").select("*");
    if (query) {
      const { author, title, page, limit } = query;
      if (page) pge = page.toString();
      if (limit) lmt = limit.toString();
      if (author) booksQuery.where({ author_id: author });
      if (title)
        booksQuery.whereRaw("LOWER(title) LIKE ?", [
          `%${title.toString().toLowerCase()}%`,
        ]);
    }

    const offset = (parseInt(pge) - 1) * parseInt(lmt);
    booksQuery.offset(offset).limit(parseInt(lmt));

    const books = await booksQuery;
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve books" });
  }
};

// GET /books/:id
export const getBookById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const book = await knex("books").where({ id }).first();
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve book" });
  }
};

// GET /books/:id/details
export const getBookWithAuthor = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const bookWithAuthor = await knex("books")
      .join("authors", "books.author_id", "authors.id")
      .select(
        "books.id as book_id",
        "books.title",
        "books.description",
        "books.published_date",
        "authors.id as author.id",
        "authors.name as author.name",
        "authors.bio as author.bio",
        "authors.birthdate as author.birthdate",
        // "authors.id as author_id",
        // "authors.name as author_name",
        // "authors.bio",
        // "authors.birthdate",
      )
      .where("books.id", id)
      .first();

    if (!bookWithAuthor) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json(bookWithAuthor);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve book and author" });
  }
};
