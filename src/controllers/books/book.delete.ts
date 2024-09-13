import { Request, Response } from "express";
import knex from "../../db";

// DELETE /books/:id
export const deleteBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  const decoded = req.decoded;

  try {
    const book = await knex("books").where({ id }).first();
    if (book.author_id != decoded?.id) {
      return res.status(403).json({ error: "Authorization failed" });
    }

    const deleted = await knex("books").where({ id }).del();
    if (deleted) {
      res.status(200).json({ message: "Book deleted successfully" });
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to delete book" });
  }
};
