import { FC, ReactNode } from "react";

export const H2: FC<{ children: ReactNode }> = ({ children }) => {
  return <h2 className="font-bold text-4xl text-center my-3">{children}</h2>;
};
