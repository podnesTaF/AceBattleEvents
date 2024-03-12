import { Session } from "next-auth";
import { createApiInstance } from ".";

export abstract class Api {
  protected instance;

  constructor(session?: Session | null) {
    this.instance = createApiInstance(session);
  }
}
