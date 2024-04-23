'use server'

import getSession from "@/lib/session";
import { redirect } from "next/navigation";

export const logout = async () => {
  "use server";
  const session = await getSession();
  await session.destroy();
  redirect("/");
};