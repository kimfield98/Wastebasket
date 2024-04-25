interface Props {
  image: string;
  title: string;
  description: string;
  location: string;
  price: number;
  updatedAt: Date;
  user: {
    username: string;
  };
}

export default function ListProduct({
  image,
  title,
  description,
  location,
  price,
  updatedAt,
  user: { username },
}: Props) {
  return (
    <div>
      <p>{title}</p>
      <p>{description}</p>
      <p>{username}</p>
    </div>
  );
}
