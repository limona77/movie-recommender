import { IHeaderProps } from "./types";

export function Header({ title }: IHeaderProps) {
  return <h1 className="text-3xl font-bold text-foreground">{title}</h1>;
}
