import { Request, Response } from "express";
import knex from "../../db";
import { comparePassword } from "../../utils/bcrypt";
import jsonwebtoken from "../../config/jwt";

// POST /login
export const login = async (req: Request, res: Response) => {
  const { id, password } = req.body;

  try {
    const author = await knex("authors").where({ id }).first();
    if (author) {
      const matched = await comparePassword(password, author.password);
      if (!matched) {
        return res.status(404).send("Invalid credentials");
      }

      // Generate tokens
      const payload = {
        id: author._id,
      };
      const accessToken = jsonwebtoken.generateAccessToken(payload);

      // Set tokens in Cookie & Send tokens in response
      res.cookie("accessToken", accessToken, {
        maxAge: 60 * 60 * 24 * 1000,
        secure: true,
        httpOnly: true,
      });

      res.status(200).json({ accessToken, ...author });
    } else {
      res.status(404).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
