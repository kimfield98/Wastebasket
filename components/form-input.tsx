interface FormInputProps {
  name: string;
  type: string;
  placeholder: string;
  required: boolean;
  errors?: string[];
}

export default function FormInput({
  name,
  type,
  placeholder,
  required,
  errors = [],
}: FormInputProps) {
  return (
    <div className='flex flex-col gap-2'>
      <input
        name={name}
        className='bg-transparent rounded-md w-full h-10 px-3 focus:outline-none ring-2 focus:ring-4 transition ring-neutral-200 focus:ring-yellow-500 border-none placeholder:text-neutral-400'
        type={type}
        placeholder={placeholder}
        required={required}
      />
      {errors.map((error, index) => (
        <span key={index} className='text-red-500 font-medium'>
          {error}
        </span>
      ))}
    </div>
  );
}
