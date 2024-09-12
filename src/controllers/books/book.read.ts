import { Request, Response } from "express";
import knex from "../../db";

// GET /books
export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await knex("books").select("*");
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
