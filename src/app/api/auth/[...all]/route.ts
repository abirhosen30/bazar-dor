import { getAuth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

let handlers: ReturnType<typeof toNextJsHandler> | undefined;

const getHandlers = () => {
  if (handlers) {
    return handlers;
  }

  handlers = toNextJsHandler(getAuth());
  return handlers;
};

export async function GET(request: Request) {
  return getHandlers().GET(request);
}

export async function POST(request: Request) {
  return getHandlers().POST(request);
}