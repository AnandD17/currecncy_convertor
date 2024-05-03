import { useEffect } from "react";
import useTimeout from "./useTimeout";

type Props = {
  callback: () => void;
  delay: number;
  dependency: any[];
};

const useDebounce = ({ callback, delay, dependency }: Props) => {
  const { reset, clear } = useTimeout(callback, delay);
  useEffect(reset, [...dependency, reset]);
  useEffect(clear, []);
};

export default useDebounce;
