import { Application } from "https://deno.land/x/oak/mod.ts";

import router from "./routes.ts";

const port = Deno.env.get("PORT") || 5000;

const app = new Application();

app.use(router.routes());

/// Allow all method which can delete, post etc,
app.use(router.allowedMethods());

console.log(`Server is running on port ${port}`);

await app.listen({ port: +port });
