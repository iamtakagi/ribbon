import { useLoaderData } from "@remix-run/react";
import { ReactNode } from "react";
import { OAuth2Profile } from "remix-auth-oauth2";

export default function AuthMiddleware({
  authenticated,
  notAuthenticated,
}: {
  authenticated: ReactNode;
  notAuthenticated: ReactNode;
}) {
  const { isAuthenticated } = useLoaderData<{
    profile: OAuth2Profile | null;
    isAuthenticated: boolean;
  }>();
  return (
    <div>
      {isAuthenticated ? <>{authenticated}</> : <>{notAuthenticated}</>}
    </div>
  );
}
