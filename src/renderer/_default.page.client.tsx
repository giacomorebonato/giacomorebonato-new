import { ElementType } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { PageShell } from './page-shell.js'
import type { PageContextClient } from './types.js'

export { render }

// This render() hook only supports SSR, see https://vike.dev/render-modes for how to modify render() to support SPA
async function render (pageContext: PageContextClient) {
  const Layout = pageContext.exports.Layout as ElementType | undefined

  const {
    Page, pageProps,
  } = pageContext
  if (!Page) {
    throw new Error(
      'Client-side render() hook expects pageContext.Page to be defined',
    )
  }
  const root = document.getElementById('react-root')
  if (!root) {
    throw new Error('DOM element #react-root not found')
  }
  hydrateRoot(
    root,
    <PageShell pageContext={
      pageContext
    }
    >
      {
        Layout ? <Layout><Page {...pageProps} /></Layout> : <Page {...pageProps} />
      }
    </PageShell>,
  )
}
