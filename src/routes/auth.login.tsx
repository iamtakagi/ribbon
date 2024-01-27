import type { ActionFunction, ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { authenticator } from '../authentication/authenticator.server';

export const action: ActionFunction = async ({request, params }: ActionFunctionArgs) => {
  let user = await authenticator.isAuthenticated(request.clone());
  if (user) return redirect("/");
  const body = await request.clone().formData();
  const strategy = body.get("strategy");
  if (!strategy || typeof strategy !== 'string') return redirect("/auth/login");
  await authenticator.authenticate(strategy, request.clone());
}

const strategies: Record<string, string> = {
  github: 'GitHub',
  google: 'Google'
}

export default function Login () {
  return (
    <>
      {
        Object.keys(strategies).map((strategy) => (
          <form method="post" key={strategy}>
            <input type="hidden" name="strategy" value={strategy} />
            <button type="submit">Login with {strategies[strategy]}</button>
          </form>
        ))
      }
    </>
  )
}
