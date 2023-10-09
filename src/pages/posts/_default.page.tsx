import { ReactNode } from 'react'

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <article className='prose'>
      {children}
    </article>
  )
}
