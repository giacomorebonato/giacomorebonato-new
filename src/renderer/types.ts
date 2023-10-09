import type {
  PageContextBuiltInServer,
  /*
  // When using Client Routing https://vike.dev/clientRouting
  PageContextBuiltInClientWithClientRouting as PageContextBuiltInClient
  / */
  // When using Server Routing
  PageContextBuiltInClientWithServerRouting as PageContextBuiltInClient,
  //* /
} from 'vike/types'

type PageProps = Record<string, unknown>
type Page = (pageProps: PageProps) => React.ReactElement

export type PageContextCustom = {
  Page: Page
  pageProps?: PageProps
  urlPathname: string
  exports: {
    documentProps?: {
      title?: string
      description?: string
    }
  }
}

export type PageContextServer = PageContextBuiltInServer<Page> & PageContextCustom
export type PageContextClient = PageContextBuiltInClient<Page> & PageContextCustom

export type PageContext = PageContextClient | PageContextServer
