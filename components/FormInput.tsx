interface FormInputProps {
  name: string;
  type: string;
  placeholder: string;
  className: string;
  required?: boolean;
}

export default function FormInput({
  name,
  type,
  placeholder,
  className,
  required,
}: FormInputProps) {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      className={className}
      required={required}
    />
  );
}
