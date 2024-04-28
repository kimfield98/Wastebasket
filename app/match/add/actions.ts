'use server';

export async function uploadProduct(formData: FormData) {
  const data = {
    image: formData.get('image'),
    title: formData.get('title'),
    price: formData.get('price'),
    location: formData.get('location'),
    description: formData.get('description'),
  };
  console.log(data);
}
