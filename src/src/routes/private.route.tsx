import type { ReactNode } from "react"
import { useAuth } from "../cases/auth/hooks/use-auth";
import { Navigate, useLocation } from "react-router-dom";

type PrivateRouteProps = {
    children: ReactNode;
}
import { Loader2 } from "lucide-react";

export function PrivateRoute({ children }: PrivateRouteProps) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader2 className="animate-spin w-10 h-10 text-primary" />
      </div>
    );
  }

  console.log(user)
  if (!user) {
    return <Navigate to={`/signin?redirect=${location.pathname}`} replace />;
  }

  return children;
}

