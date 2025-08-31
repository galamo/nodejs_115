import React, { ReactNode } from "react";
import { useRoles } from "@/context/roles.context";

type Props = {
  roles: Array<string>; // required role
  children: ReactNode; // content to render if allowed
  fallback?: ReactNode; // optional: what to show if denied
};

export const RolesWrapper: React.FC<Props> = ({
  roles,
  children,
  fallback = null,
}) => {
  const { isLoading, hasRole } = useRoles();

  if (isLoading) return null;
  //   if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return hasRole(roles) ? <>{children}</> : <>{fallback}</>;
};
