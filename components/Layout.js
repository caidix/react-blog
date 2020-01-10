import React from 'react'
import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'
import { Affix } from 'antd'
const Layout = (props) => {
  let title = props.title || '我的小站'
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Affix offsetTop={0}>
        <Header />
      </Affix>
      {props.children}
      <Footer />
    </>
  )
}
export default Layout;