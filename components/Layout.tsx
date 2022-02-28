import React, { Fragment } from 'react'
import Head from 'next/head'

type LayoutProps = {
  children: React.ReactNode;
  title?: string
}

const Layout = ({ children, title = "Atomic Tunes" }: LayoutProps) => {
  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Atomic Tunes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='container'>
        {children}
      </div>
    </Fragment>

  )
}

export default Layout