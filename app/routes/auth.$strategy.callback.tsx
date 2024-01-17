import { type LoaderFunctionArgs, type LoaderFunction, redirect } from "@remix-run/cloudflare";
import { authenticator } from '../authentication/authenticator.server';

export const loader: LoaderFunction = async ({ request, params }: LoaderFunctionArgs) => {
  const { strategy } = params;
  if (!strategy || typeof strategy !== 'string') return redirect("/auth/login");
  return await authenticator.authenticate(strategy, request, {
    successRedirect: "/",
    failureRedirect: "/",
  });
}