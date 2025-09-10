import { getUserDetailsApi } from "@/services/user.api";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type Role = string;

type RolesContextValue = {
  roles: Role[];
  email: string;
  isLoading: boolean;
  error: string | null;
  hasRole: (role: Array<Role>) => boolean;
};

const RolesContext = createContext<RolesContextValue | undefined>(undefined);

type Props = { children: ReactNode };

export const RolesProvider: React.FC<Props> = ({ children }) => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [currentUserSingleRole, setCurrentUserSingleRole] = useState<Role>("");
  const [isLoading, setIsLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<Role>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getUserDetails() {
      try {
        setIsLoading(true);
        setError(null);
        const res = await getUserDetailsApi();
        setCurrentUserSingleRole(res.role);
        setUserEmail(res.email);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    }

    getUserDetails();
  }, []);

  const value: RolesContextValue = {
    roles,
    email: userEmail,
    isLoading,
    error,
    hasRole: (roles) =>
      Array.isArray(roles) && roles.includes(currentUserSingleRole),
  };

  return (
    <RolesContext.Provider value={value}>{children}</RolesContext.Provider>
  );
};

export function useRoles() {
  const ctx = useContext(RolesContext);
  if (!ctx) throw new Error("useRoles must be used inside <RolesProvider>");
  return ctx;
}

export function useEmail() {
  const ctx = useContext(RolesContext);
  if (!ctx) throw new Error("useRoles must be used inside <RolesProvider>");
  return ctx.email;
}
