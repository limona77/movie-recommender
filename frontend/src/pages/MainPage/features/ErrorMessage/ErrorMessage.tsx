import { IErrorMessageProps } from "./types";

export function ErrorMessage({ message }: IErrorMessageProps) {
  if (!message) return null;

  return <p className="text-destructive text-sm">{message}</p>;
}
