import { Request, Response } from "express";
import knex from "../../db";

// GET /books
export const getAllBooks = async (req: Request, res: Response) => {
  const query = req.query;
  const filter: { author_id?: number } = {};
  if (query) {
    const { author } = query;
    if (author) filter.author_id = parseInt(query.author as string);
  }

  try {
    const books = await knex("books")
      .where({ ...filter })
      .select("*");
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
