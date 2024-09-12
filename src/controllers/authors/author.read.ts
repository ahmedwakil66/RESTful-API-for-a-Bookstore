import { Request, Response } from "express";
import { validationResult } from "express-validator";
import knex from "../../db";

// GET /authors
export const getAuthors = async (req: Request, res: Response) => {
  const query = req.query;
  try {
    const authorsQuery = knex("authors").select("*");
    if (query && query.name) {
      authorsQuery.whereRaw("LOWER(name) LIKE ?", [
        `%${query.name.toString().toLowerCase()}%`,
      ]);
    }
    const authors = await authorsQuery;
    res.status(200).json(authors);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve authors" });
  }
};

// GET /authors/:id
export const getAuthor = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const author = await knex("authors").where({ id }).first();
    if (author) {
      res.status(200).json(author);
    } else {
      res.status(404).json({ error: "Author not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve author" });
  }
};

// GET /authors/details
export const getAuthorsWithBooks = async (req: Request, res: Response) => {
  try {
    const authorsWithBooks = await knex("authors")
      .leftJoin("books", "authors.id", "books.author_id")
      .select(
        "authors.id",
        "authors.name",
        "books.id as book_id",
        "books.title as book_title",
        "books.created_at as book_created_at",
        "books.updated_at as book_updated_at",
      )
      .groupBy("authors.id", "books.id"); // Grouping to avoid duplicates

    console.log(authorsWithBooks);

    const authors = authorsWithBooks.reduce((acc: any[], row: any) => {
      let author = acc.find((a) => a.id === row.id);

      if (!author) {
        author = {
          id: row.id,
          name: row.name,
          books: [],
        };
        acc.push(author);
      }

      if (row.book_id) {
        author.books.push({
          id: row.book_id,
          title: row.book_title,
          created_at: row.book_created_at,
          updated_at: row.book_updated_at,
        });
      }

      return acc;
    }, []);

    res.status(200).json(authors);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve authors and books" });
  }
};

// GET /authors/:id/details
export const getAuthorWithBooks = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const authorWithBooks = await knex("authors")
      .leftJoin("books", "authors.id", "books.author_id")
      .select(
        "authors.id as author_id",
        "authors.name as author_name",
        "authors.bio",
        "authors.birthdate",
        "authors.created_at",
        "books.id as book_id",
        "books.title as book_title",
        "books.created_at as book_created_at",
        "books.updated_at as book_updated_at",
      )
      .where("authors.id", id)
      .groupBy("authors.id", "books.id");

    if (authorWithBooks.length === 0) {
      return res.status(404).json({ error: "Author not found" });
    }

    const author = {
      author_id: authorWithBooks[0].author_id,
      author_name: authorWithBooks[0].author_name,
      bio: authorWithBooks[0].bio,
      birthdate: authorWithBooks[0].birthdate,
      created_at: authorWithBooks[0].created_at,
      books: authorWithBooks
        .filter((row) => row.book_id)
        .map((book) => ({
          id: book.book_id,
          title: book.book_title,
          created_at: book.book_created_at,
          updated_at: book.book_updated_at,
        })),
    };

    res.status(200).json(author);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve author and books" });
  }
};
