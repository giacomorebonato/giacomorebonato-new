import { ElementType } from 'react'
import ReactDOMServer from 'react-dom/server'
import {
  dangerouslySkipEscape,
  escapeInject,
} from 'vike/server'
import logoUrl from './logo.svg'
import { PageShell } from './page-shell.js'
import type { PageContextServer } from './types.js'

export { render }
// See https://vike.dev/data-fetching
export const passToClient = [
  'pageProps',
  'urlPathname',
]

async function render (pageContext: PageContextServer) {
  const Layout = pageContext.exports.Layout as ElementType | undefined
  const {
    Page, pageProps,
  } = pageContext
  // This render() hook only supports SSR, see https://vike.dev/render-modes for how to modify render() to support SPA
  if (!Page) {
    throw new Error('My render() hook expects pageContext.Page to be defined')
  }
  const pageHtml = ReactDOMServer.renderToString(
    <PageShell pageContext={
      pageContext
    }
    >
      {
        Layout ? <Layout><Page {...pageProps} /></Layout> : <Page {...pageProps} />
      }
    </PageShell>,
  )

  // See https://vike.dev/head
  const { documentProps } = pageContext.exports
  const title = (documentProps && documentProps.title) || 'Vite SSR app'
  const desc = (
    documentProps && documentProps.description
  ) || 'App using Vite + Vike'

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="${logoUrl}" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${desc}" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/github-dark.min.css" />
        <title>${title}</title>
      </head>
      <body>
        <div id="react-root">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`

  return {
    documentHtml,
    pageContext: {},
  }
}
