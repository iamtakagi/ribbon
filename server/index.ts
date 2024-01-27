import { broadcastDevReady } from '@remix-run/node'
import Koa, { type Context } from 'koa'
import serve from 'koa-static'
import { createRequestHandler } from './adapter.js'
import './process.js'

declare module '@remix-run/server-runtime' {
  export interface AppLoadContext extends Context {}
}

(async () => {
  const build = await import('../src/index.js') as any

  const app = new Koa()

  app.use(function setClientIP(ctx, next) {
    if (ctx.request.headers['x-real-ip']) {
      ctx.request.ip = Array.isArray(ctx.request.headers['x-real-ip'])
        ? ctx.request.headers['x-real-ip'][0]
        : ctx.request.headers['x-real-ip']
    }
    return next()
  })

  // No ending slashes for SEO reasons
  // https://github.com/epicweb-dev/epic-stack/discussions/108
  app.use(function removeTrailingSlash(ctx, next) {
    if (ctx.request.path.endsWith('/') && ctx.request.path.length > 1) {
      const query = ctx.request.url.slice(ctx.request.path.length)
      const safepath = ctx.request.path.slice(0, -1).replace(/\/+/g, '/')
      ctx.status = 301
      ctx.redirect(safepath + query)
    } else {
      return next()
    }
  })

  app.use(
    serve('../../public/build', {
      immutable: true,
    }),
  )

  app.use(
    serve('../../public/fonts', {
      immutable: true,
    }),
  )

  app.use(
    serve('../../public', {
      immutable: false,
    }),
  )

  app.use(createRequestHandler({ build, mode: process.env.NODE_ENV, getLoadContext: (ctx) => ctx }))

  app.listen({ port: Number(process.env.PORT) }, () => {
    console.log(`🚀 To infinity...and beyond!`)
    if (process.env.NODE_ENV === 'development') {
      broadcastDevReady(build)
    }
  })
})()