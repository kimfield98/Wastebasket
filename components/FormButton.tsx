interface FormButtonProps {
  className: string;
  text: string;
}

export default function FormButton({ className, text }: FormButtonProps) {
  return <button className={className}>{text}</button>;
}
