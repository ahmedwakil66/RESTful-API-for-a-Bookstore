import express from "express";
import { body } from "express-validator";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getBookById,
  getBookWithAuthor,
  updateBook,
} from "../controllers";
import { validateAuthorExists } from "../middlewares/validateAuthor";

const router = express.Router();

router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.get("/:id/details", getBookWithAuthor);

router.post(
  "/",
  [
    body("title")
      .isString()
      .notEmpty()
      .withMessage("Title is required and should be a non-empty string"),
    body("published_date")
      .isISO8601()
      .toDate()
      .withMessage("Published date must be a valid date"),
    body("author_id")
      .isInt()
      .withMessage("Author ID must be an integer")
      .custom(validateAuthorExists),
  ],
  createBook,
);

router.put(
  "/:id",
  [
    body("title")
      .optional()
      .isString()
      .notEmpty()
      .withMessage("Title should be a non-empty string if provided"),
    body("published_date")
      .optional()
      .isISO8601()
      .toDate()
      .withMessage("Published date must be a valid date if provided"),
    body("author_id")
      .optional()
      .isInt()
      .withMessage("Author ID must be an integer")
      .custom(validateAuthorExists),
  ],
  updateBook,
);

router.delete("/:id", deleteBook);

export default router;
