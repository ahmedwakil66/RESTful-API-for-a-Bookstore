import { DecodedPayload } from "./jwt";

declare global {
  namespace Express {
    interface Request {
      decoded?: DecodedPayload;
    }
  }
}
