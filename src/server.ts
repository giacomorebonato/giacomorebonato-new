import { fastify } from 'fastify'
import { renderPage } from 'vike/server'
import Root from 'app-root-path'

const isProduction = process.env.NODE_ENV === 'production'

startServer()

async function startServer () {
  const app = fastify({
    maxParamLength: 5_000,
    logger: true,
  })

  await app
    .register(import('@fastify/early-hints'), {
      warn: true,
    })
    .register(import('@fastify/compress'), { global: false })

  if (isProduction) {
    await app.register(import('@fastify/static'), {
      prefix: '/assets/',
      root: `${Root.path}/dist/client`,
    })
  } else {
    const vite = await import('vite')
    const viteDevMiddleware = (
      await vite.createServer({
        root: Root.path,
        server: { middlewareMode: true },
      })
    ).middlewares

    await app.register(import('@fastify/express'))

    app.use(viteDevMiddleware)
  }

  app.get('*', async (request, reply) => {
    const pageContextInit = { urlOriginal: request.originalUrl }
    const pageContext = await renderPage(pageContextInit)
    const { httpResponse } = pageContext
    if (!httpResponse) {
      return
    }

    const {
      body, statusCode, headers, earlyHints,
    } = httpResponse
    if (reply.writeEarlyHints) {
      reply.writeEarlyHints({
        link: earlyHints.map((e) => {
          return e.earlyHintLink
        }),
      })
    }
    headers.forEach(([
      name,
      value,
    ]) => {
      reply.header(name, value)
    })

    // For HTTP streams use httpResponse.pipe() instead,
    // see https://vike.dev/stream
    reply.status(statusCode).send(body)
  })

  const port = process.env.PORT ? +process.env.PORT : 3000
  app.listen({ port, host: '0.0.0.0' })
}
