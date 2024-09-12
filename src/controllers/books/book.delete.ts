import { Request, Response } from "express";
import { validationResult } from "express-validator";
import knex from "../../db";

// DELETE /books/:id
export const deleteBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
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
