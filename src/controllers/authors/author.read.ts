import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import knex from '../../db';

// GET /authors
export const getAllAuthors = async (req: Request, res: Response) => {
  try {
    const authors = await knex('authors').select('*');
    res.status(200).json(authors);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve authors' });
  }
};

// GET /authors/:id
export const getAuthorById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const author = await knex('authors').where({ id }).first();
    if (author) {
      res.status(200).json(author);
    } else {
      res.status(404).json({ error: 'Author not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve author' });
  }
};
