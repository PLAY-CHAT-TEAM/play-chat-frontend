import { ChangeEventHandler } from "react";

interface Props<T> {
  type: string;
  required: boolean;
  placeholder: string;
  value: T;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const Input = <T extends string | number | readonly string[] | undefined>({
  type,
  required,
  placeholder,
  value,
  onChange,
}: Props<T>) => {
  return (
    <input
      className="px-3 py-2 border rounded mb-4 w-80 focus:outline-sky-700"
      type={type}
      required={required}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
