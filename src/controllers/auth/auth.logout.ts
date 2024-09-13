import { Request, Response } from "express";
import jsonwebtoken from "../../config/jwt";

// POST /logout
export const logout = async (req: Request, res: Response) => {
  let accessToken;
  const cookies = req.headers.cookie;
  accessToken = cookies?.split("accessToken=")[1];
  if (!accessToken && req.body.accessToken) accessToken = req.body.accessToken;

  try {
    jsonwebtoken.verifyToken(accessToken);

    // Delete cookie in client
    res.cookie("accessToken", "", {
      maxAge: 0,
      secure: true,
      httpOnly: true,
    });

    return res.status(200).json({ message: "logout success" });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Server error" });
  }
};
