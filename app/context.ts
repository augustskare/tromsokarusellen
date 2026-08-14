import { createContext } from "react-router";

/**
 * Cloudflare's per-request `env` (bindings) and `ctx` (waitUntil etc.),
 * populated by the Worker entry in `workers/app.ts`.
 *
 * Read it in a loader or action with `context.get(cloudflare)`.
 */
export const cloudflare = createContext<{
  env: Env;
  ctx: ExecutionContext;
}>();
