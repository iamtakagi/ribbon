import { Hono } from 'hono'
import { env } from 'hono/adapter'
import type { AppLoadContext } from '@remix-run/cloudflare'
import { createRequestHandler } from '@remix-run/cloudflare'
import * as build from '../build'
import * as containerSetter from '../app/container/setter';
import container from '../app/container'

// @ts-ignore
const handleRemixRequest = createRequestHandler(build, process.env.NODE_ENV)

const app = new Hono()

containerSetter.set(container);

app.all('*', async (c) => {
  const loadContext: AppLoadContext = { env: env(c) }
  return await handleRemixRequest(c.req.raw, loadContext)
})

export default app