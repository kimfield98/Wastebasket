interface FormInputProps {
  name: string;
  type: string;
  placeholder: string;
  className: string;
  required?: boolean;
  errors?: string[];
}

export default function FormInput({
  name,
  type,
  placeholder,
  className,
  required,
  errors = [],
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <input
        name={name}
        className={className}
        type={type}
        placeholder={placeholder}
        required={required}
      />
      {errors?.map((error, index) => (
        <span key={index} className="text-red-500 font-medium">
          {error}
        </span>
      ))}
    </div>
  );
}
