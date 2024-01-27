import { json } from '@remix-run/node'

export function action() {
  return json({ message: 'Ping Pong!' }, { headers: { 'X-Remix-Action': 'hello' } })
}

export function loader() {
  const shouldRefreshIfVersionMismatch = Boolean(
    process.env.SHOULD_REFRESH_BROWSER_IF_VERSION_MISMATCH &&
      process.env.SHOULD_REFRESH_BROWSER_IF_VERSION_MISMATCH !== 'false',
  )

  return json({
    build: process.env.BUILD_VERSION,
    shouldRefreshIfVersionMismatch,
  })
}