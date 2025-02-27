import { Hono } from "hono";
import { db } from "@/db/drizzle";
const usersApp = new Hono().get("/", async (c) => {
  const users = await db.query.userTable.findMany();
  if (!users || users.length === 0)
    return c.json({ success: false, message: "No user found" }, 404);
  return c.json({ success: true, data: users });
});

export default usersApp;
