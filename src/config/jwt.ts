import jwt from "jsonwebtoken";
import { EncodedPayload, DecodedPayload } from "../@types/jwt";

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

type JWTOptions = {
  accessTokenSecret: string;
  accessTokenExpiresIn?: string | number;
};

class JWT {
  #accessTokenSecret: string;
  #accessTokenExpiresIn: string | number;

  constructor(options: JWTOptions) {
    if (!options.accessTokenSecret) {
      throw new Error("accessTokenSecret must be provided");
    } else if (typeof options.accessTokenSecret !== "string") {
      throw new Error("accessTokenSecret must be of string type");
    }

    this.#accessTokenSecret = options.accessTokenSecret;
    this.#accessTokenExpiresIn = options.accessTokenExpiresIn || "1h";
  }

  generateAccessToken(payload: EncodedPayload) {
    return jwt.sign(payload, this.#accessTokenSecret, {
      expiresIn: this.#accessTokenExpiresIn,
    });
  }

  verifyToken(token: string, type: "access") {
    try {
      const secret = this.#accessTokenSecret;
      return jwt.verify(token, secret) as DecodedPayload;
    } catch (error) {
      return null;
    }
  }
}

let jsonwebtoken: JWT;

try {
  jsonwebtoken = new JWT({
    accessTokenSecret: accessTokenSecret as string,
    accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
  });
} catch (error: any) {
  console.log("JWT initialization error: ", error.message, " Existing...");
  //   console.log("Failed to initialize JWT instance. Authentication route will malfunction.");
  process.exit(1);
}

export default jsonwebtoken;
