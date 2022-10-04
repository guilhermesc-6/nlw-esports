import { Path, UseFormRegister } from "react-hook-form";
import { InputTypes } from "../CreateAdModal";

// interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

type InputProps = {
  label: Path<InputTypes>;
  register: UseFormRegister<InputTypes>;
  required: boolean;
  placeholder: string;
  type?: string;
  pattern?: RegExp | undefined;
};

export const Input = ({
  label,
  register,
  required,
  placeholder,
  type = "text",
  pattern = undefined,
}: InputProps) => (
  <input
    {...register(label, { required, pattern: pattern })}
    id={label}
    placeholder={placeholder}
    type={type}
    className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500'
  />
);
