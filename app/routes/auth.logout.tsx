import type { LoaderFunction, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";
import { authenticator } from '../authentication/authenticator.server';

export const loader: LoaderFunction = async ({request}: LoaderFunctionArgs) => {
  let user = await authenticator.isAuthenticated(request);
  if (!user) return redirect("/");
  return await authenticator.logout(request, { redirectTo: "/" });
}