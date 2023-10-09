import { z } from 'zod'

export const FrontMatterSchema = z.object({
  title: z.string(),
  createdAt: z.string(),
})

export type FrontMatter = z.infer<typeof FrontMatterSchema>
