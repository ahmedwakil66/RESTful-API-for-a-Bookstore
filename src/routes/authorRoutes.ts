import express from 'express';
import { body } from 'express-validator';
import {
  createAuthor,
  deleteAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthor,
} from '../controllers';

const router = express.Router();

router.get('/', getAllAuthors);
router.get('/:id', getAuthorById);

router.post(
  '/',
  [
    body('name')
      .isString()
      .notEmpty()
      .withMessage('Name is required and should be a non-empty string'),
    body('birthdate')
      .isISO8601()
      .toDate()
      .withMessage('Birthdate must be a valid date'),
  ],
  createAuthor,
);

router.put(
  '/:id',
  [
    body('name')
      .optional()
      .isString()
      .notEmpty()
      .withMessage('Name is required and should be a non-empty string'),
    body('birthdate')
      .optional()
      .isISO8601()
      .toDate()
      .withMessage('Birthdate must be a valid date'),
  ],
  updateAuthor,
);

router.delete('/:id', deleteAuthor);

export default router;
