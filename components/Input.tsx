import { ChangeEventHandler } from "react";

interface Props<T> {
  type: string;
  required: boolean;
  placeholder: string;
  value: T;
  onChange: ChangeEventHandler<HTMLInputElement>;
  maxLength?: number;
  marginActive?: boolean;
}

const Input = <T extends string | number | readonly string[] | undefined>({
  type,
  required,
  placeholder,
  value,
  onChange,
  maxLength,
  marginActive = true,
}: Props<T>) => {
  return (
    <input
      className={`px-3 py-2 border rounded w-80 focus:outline-sky-700 ${
        marginActive && "mb-4"
      }`}
      type={type}
      required={required}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      maxLength={maxLength}
    />
  );
};

export default Input;
