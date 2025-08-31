import React, { ReactNode } from "react";
import { useRoles } from "@/context/roles.context";

type Props = {
  role: string; // required role
  children: ReactNode; // content to render if allowed
  fallback?: ReactNode; // optional: what to show if denied
};

export const RolesWrapper: React.FC<Props> = ({
  role,
  children,
  fallback = null,
}) => {
  const { isLoading, hasRole } = useRoles();

  if (isLoading) return null;
  //   if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return hasRole(role) ? <>{children}</> : <>{fallback}</>;
};
