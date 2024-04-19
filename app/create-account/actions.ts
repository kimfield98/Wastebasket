"use server";

export const createAccount = async (prevState: any, formData: FormData) => {
  const data = {
    userName: formData.get('userName'),
    email: formData.get('email'),
    password: formData.get('password'),
  };
  console.log(data);
}