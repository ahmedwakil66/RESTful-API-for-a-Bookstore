import express from 'express';
import { body } from 'express-validator';
import { createAuthor, getAllAuthors, getAuthorById } from '../controllers';

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
    body('birthdate').isDate().withMessage('Birthdate must be a valid date'),
  ],
  createAuthor,
);

export default router;
