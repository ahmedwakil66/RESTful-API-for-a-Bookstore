import { Request, Response } from "express";
import { validationResult } from "express-validator";
import knex from "../../db";

// POST /books
export const createBook = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description, published_date, author_id } = req.body;

  try {
    const [id] = await knex("books").insert({
      title,
      description,
      published_date,
      author_id,
    });
    res.status(201).json({ id, title, description, published_date, author_id });
  } catch (err) {
    res.status(500).json({ error: "Failed to create book" });
  }
};
