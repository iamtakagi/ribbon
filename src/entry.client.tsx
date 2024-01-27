/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/docs/en/main/file-conventions/entry.client
 */

import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { routerPaths } from '../routes.ts'

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <RemixBrowser />
    </StrictMode>
  );
});

window.addEventListener('focus', async () => {
  const response = await fetch(routerPaths['/health'])
  if (response.status === 200) {
    const json = await response.json()
    if (json.build !== window.ENV.BUILD_VERSION && json.shouldRefreshIfVersionMismatch) {
      window.location.reload()
    }
  }
})
