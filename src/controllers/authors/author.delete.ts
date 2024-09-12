import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import knex from '../../db';

// DELETE /authors/:id
export const deleteAuthor = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deleted = await knex('authors').where({ id }).del();
    if (deleted) {
      res.status(200).json({ message: 'Author deleted successfully' });
    } else {
      res.status(404).json({ error: 'Author not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete author' });
  }
};