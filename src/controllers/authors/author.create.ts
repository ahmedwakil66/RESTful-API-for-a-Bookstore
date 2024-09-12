import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import knex from '../../db';

// POST /authors
export const createAuthor = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, bio, birthdate } = req.body;

  try {
    const result = await knex('authors').insert({ name, bio, birthdate });
    res.status(201).json({ id: result[0], name, bio, birthdate });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to create author' });
  }
};
