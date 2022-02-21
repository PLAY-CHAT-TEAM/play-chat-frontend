import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
} from "react";

type ReturnTypes<T> = [
  T,
  (e: ChangeEvent<HTMLInputElement>) => void,
  Dispatch<SetStateAction<T>>
];

const useInput = <T>(initialData: T): ReturnTypes<T> => {
  const [value, setValue] = useState(initialData);
  const handler = useCallback((event) => {
    const {
      target: { value },
    } = event;
    setValue(value);
  }, []);
  return [value, handler, setValue];
};

export default useInput;
