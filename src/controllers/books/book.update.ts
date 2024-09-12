import { Request, Response } from "express";
import { validationResult } from "express-validator";
import knex from "../../db";

// PUT /books/:id
export const updateBook = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { title, description, published_date, author_id } = req.body;

  const updatedData: {
    title?: string;
    description?: string;
    published_date?: string;
    author_id?: number;
  } = {};

  if (title) updatedData.title = title;
  if (description) updatedData.description = description;
  if (published_date) updatedData.published_date = published_date;
  if (author_id) updatedData.author_id = author_id;

  try {
    const updated = await knex("books").where({ id }).update(updatedData);
    if (updated) {
      res.status(200).json({ id, ...updatedData });
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to update book" });
  }
};
