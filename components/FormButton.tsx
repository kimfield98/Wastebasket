"use client";

import { useFormStatus } from "react-dom";

interface FormButtonProps {
  text: string;
}

export default function FormButton({ text }: FormButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} className="primary-btn disabled:bg-neutral-400  disabled:text-neutral-300 disabled:cursor-not-allowed w-72 sm:w-72 h-10 bg-lime-600 rounded-md text-white font-semibold">
      {pending ? "로딩 중 ..." : text}
    </button>
  );
}
