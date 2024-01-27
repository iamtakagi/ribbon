export const routerPaths = {
  "/": "/",
  "/auth/:strategy/callback"(params: { strategy: string | number }) {
    return buildPath("/auth/:strategy/callback", params);
  },
  "/articles/:slug"(params: { slug: string | number }) {
    return buildPath("/articles/:slug", params);
  },
  "/auth/logout": "/auth/logout",
  "/auth/login": "/auth/login",
  "/edit": "/edit",
  "/ping": "/ping",
} as const;

export const unsafeRouterPaths = {
  "/"(params: Record<string, unknown>) {
    return unsafeBuildPath("/", params);
  },
  "/auth/:strategy/callback"(params: Record<string, unknown>) {
    return unsafeBuildPath("/auth/:strategy/callback", params);
  },
  "/articles/:slug"(params: Record<string, unknown>) {
    return unsafeBuildPath("/articles/:slug", params);
  },
  "/auth/logout"(params: Record<string, unknown>) {
    return unsafeBuildPath("/auth/logout", params);
  },
  "/auth/login"(params: Record<string, unknown>) {
    return unsafeBuildPath("/auth/login", params);
  },
  "/edit"(params: Record<string, unknown>) {
    return unsafeBuildPath("/edit", params);
  },
  "/ping"(params: Record<string, unknown>) {
    return unsafeBuildPath("/ping", params);
  },
} as const;

export type RouterPath = keyof typeof routerPaths;

export type RouterParams = {
  "/": {};
  "/auth/:strategy/callback": { strategy: string };
  "/articles/:slug": { slug: string };
  "/auth/logout": {};
  "/auth/login": {};
  "/edit": {};
  "/ping": {};
};

type InputParams = {
  "/": {};
  "/auth/:strategy/callback": { strategy: string | number };
  "/articles/:slug": { slug: string | number };
  "/auth/logout": {};
  "/auth/login": {};
  "/edit": {};
  "/ping": {};
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function buildPath<TRouterPath extends RouterPath>(
  route: TRouterPath,
  params: InputParams[TRouterPath],
) {
  return route
    .replace(/'/g, "")
    .split("/")
    .map((part) =>
      part.startsWith(":")
        ? params[
            part
              .replace(":", "")
              .replace("?", "") as keyof InputParams[TRouterPath]
          ]
        : part,
    )
    .filter((part) => part !== undefined)
    .join("/");
}

function unsafeBuildPath<TRouterPath extends RouterPath>(
  route: TRouterPath,
  params: Record<string, unknown>,
) {
  return route
    .replace(/'/g, "")
    .split("/")
    .map((part) =>
      part.startsWith(":")
        ? params[part.replace(":", "").replace("?", "")]
        : part,
    )
    .filter((part) => part !== undefined)
    .join("/");
}
