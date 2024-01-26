import type { LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { authenticator } from '../authentication/authenticator.server';

export const loader: LoaderFunction = async ({request}: LoaderFunctionArgs) => {
  let user = await authenticator.isAuthenticated(request);
  if (!user) return redirect("/");
  return await authenticator.logout(request, { redirectTo: "/" });
}