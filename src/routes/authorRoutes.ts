import express from "express";
import { body } from "express-validator";
import {
  createAuthor,
  deleteAuthor,
  getAuthors,
  getAuthor,
  getAuthorWithBooks,
  updateAuthor,
  getAuthorsWithBooks,
} from "../controllers";

const router = express.Router();

router.get("/", getAuthors);
router.get("/details", getAuthorsWithBooks);
router.get("/:id", getAuthor);
router.get("/:id/details", getAuthorWithBooks);

router.post(
  "/",
  [
    body("name")
      .isString()
      .notEmpty()
      .withMessage("Name is required and should be a non-empty string"),
    body("birthdate")
      .isISO8601()
      .toDate()
      .withMessage("Birthdate must be a valid date"),
  ],
  createAuthor,
);

router.put(
  "/:id",
  [
    body("name")
      .optional()
      .isString()
      .notEmpty()
      .withMessage("Name is required and should be a non-empty string"),
    body("birthdate")
      .optional()
      .isISO8601()
      .toDate()
      .withMessage("Birthdate must be a valid date"),
  ],
  updateAuthor,
);

router.delete("/:id", deleteAuthor);

export default router;
