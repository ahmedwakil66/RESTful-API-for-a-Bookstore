import express from "express";
import { body } from "express-validator";
import { login, logout } from "../controllers";

const router = express.Router();

router.post(
  "/login",
  [
    body("id").isInt().withMessage("Invalid id format"),
    body("password")
      .isString()
      .notEmpty()
      .withMessage("password should be a non-empty string"),
  ],
  login,
);

router.post("/logout", logout);

export default router;
