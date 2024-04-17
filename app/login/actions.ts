"use server"

import { redirect } from "next/navigation";

export async function onSubmit(prevState:any, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  redirect("/")
  return { ...prevState, ...formData };
}