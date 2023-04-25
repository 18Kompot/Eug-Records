import React from "react";

interface Props {
  children: React.ReactNode;
}
const Wrapper = ({ children }: Props) => (
  <div className="container">{children}</div>
);
export default Wrapper;
