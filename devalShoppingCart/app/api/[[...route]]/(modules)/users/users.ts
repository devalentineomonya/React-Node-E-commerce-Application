import { UserModel } from "@/models/user";
import { Hono } from "hono";

const router = new Hono().get("/", async (c) => {

  const users = await UserModel.find(
    {},
    "-verificationCodeExpires -passwordResetCodeExpires -passwordResetCode -verificationCode -password"
  ).lean();

  if (users.length === 0) {
    return c.json({ success: false, message: "No users found" }, 404);
  }


  return c.json({ success: true, data: users }, 200);
});

export default router;
