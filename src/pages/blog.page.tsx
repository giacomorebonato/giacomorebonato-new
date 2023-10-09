import { FrontMatter, FrontMatterSchema } from '#mdx/front-matter.js'
import Yaml from 'js-yaml'

import Root from 'app-root-path'
import Fs from 'node:fs'
import Path from 'node:path'

// eslint-disable-next-line react-refresh/only-export-components
export async function onBeforeRender () {
  const contentPath = Path.resolve(Root.path, 'src', 'pages', 'posts')
  const filenames = Fs.readdirSync(contentPath).filter((filename) => {
    return Path.parse(filename).ext === '.mdx'
  })
  const frontMatters: (FrontMatter & { name: string })[] = [
  ]

  for (const filename of filenames) {
    const text = Fs.readFileSync(Path.join(contentPath, filename), 'utf-8')
    const frontMatterData = Yaml.loadAll(text)[0]

    if (frontMatterData) {
      const frontMatter = FrontMatterSchema.parse(frontMatterData)

      frontMatters.push({
        ...frontMatter,
        name: encodeURIComponent(filename.replace('.page.mdx', '')),
      })
    }
  }

  return {
    pageContext: {
      pageProps: { frontMatters },
      documentProps: { title: 'Blog' },
    },
  }
}

export function Page (props: {
  frontMatters: (FrontMatter & { name: string })[]
}) {
  return (
    <div>
      <h1>Posts</h1>
      {
      props?.frontMatters?.map((item) => {
        return (
          <div key={
            item.createdAt
          }
          >
            <a href={
              `/posts/${encodeURIComponent(item.name)}`
            }
            >
              {
                item.title
              }
            </a>
          </div>
        )
      })
    }
    </div>
  )
}
