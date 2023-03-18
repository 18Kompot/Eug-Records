import React from "react";
import { Navigate } from "react-router-dom";
import { verifyToken } from "../services/storage";

interface Props {
  children: React.ReactNode;
}

function RouteGuard({ children }: Props) {
  return verifyToken() ? (
    <>{children}</>
  ) : (
    <Navigate replace={true} to="/login" />
  );
}

export default RouteGuard;
