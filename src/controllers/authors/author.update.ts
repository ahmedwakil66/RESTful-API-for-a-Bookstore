import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import knex from '../../db';

// PUT /authors/:id
export const updateAuthor = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { name, bio, birthdate } = req.body;

  const updatedData: { name?: string; bio?: string; birthdate?: string } = {};

  if (name) updatedData.name = name;
  if (bio) updatedData.bio = bio;
  if (birthdate) updatedData.birthdate = birthdate;

  try {
    const updated = await knex('authors')
      .where({ id })
      .update({ name, bio, birthdate });
    if (updated) {
      res.status(200).json({ id, ...updatedData });
    } else {
      res.status(404).json({ error: 'Author not found' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to update author' });
  }
};
