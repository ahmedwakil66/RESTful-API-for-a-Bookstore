import { Request, Response } from "express";
import { validationResult } from "express-validator";
import knex from "../../db";
import { hashPassword } from "../../utils/bcrypt";

// POST /authors
export const createAuthor = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, bio, birthdate } = req.body;
  const password = await hashPassword("12345");

  try {
    const result = await knex("authors").insert({
      name,
      bio,
      birthdate,
      password,
    });
    res
      .status(201)
      .json({ id: result[0], name, bio, birthdate, password: "12345" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to create author" });
  }
};
