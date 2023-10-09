import React from 'react'
import './page-shell.css'
import type { PageContext } from './types.js'
import { PageContextProvider } from './use-page-context.js'

export function PageShell ({
  children, pageContext,
}: { children: React.ReactNode; pageContext: PageContext }) {
  return (
    <React.StrictMode>
      <PageContextProvider pageContext={
        pageContext
      }
      >
        <div className='drawer lg:drawer-open'>
          <input id='my-drawer-2' type='checkbox' className='drawer-toggle' />
          <div className='drawer-content p-4'>
            {
              children
            }
            <label
              htmlFor='my-drawer-2'
              className='btn btn-primary drawer-button lg:hidden'
            >Open drawer
            </label>
          </div>
          <div className='drawer-side'>
            <label htmlFor='my-drawer-2' aria-label='close sidebar' className='drawer-overlay' />
            <ul className='menu min-h-full w-80 bg-base-200 p-4 text-base-content'>
              <li><a href='/'>Home</a></li>
              <li><a href='/blog'>Blog</a></li>
            </ul>
          </div>
        </div>
      </PageContextProvider>
    </React.StrictMode>
  )
}
