import react from '@vitejs/plugin-react-swc'
import ssr from 'vike/plugin'
import { UserConfig } from 'vite'
import mdx from '@mdx-js/rollup'
import remarkFrontmatter from 'remark-frontmatter'
import rehypeHighlight from 'rehype-highlight'

const config: UserConfig = {
  plugins: [
    react(),
    ssr({ prerender: true }),
    mdx({
      rehypePlugins: [rehypeHighlight as any],
      remarkPlugins: [remarkFrontmatter],
    }),
  ],
}

export default config
