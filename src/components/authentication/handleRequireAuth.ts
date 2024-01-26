import { redirect } from "@remix-run/node";
import { authenticator } from "../../authentication/authenticator.server";

export const handleRequireAuth = async (request: Request) => {
  const data = await authenticator.isAuthenticated(request);
  if (!data) {
    return redirect("/auth/login");
  }
  return data;
};
