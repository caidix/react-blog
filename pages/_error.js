import React from 'react'
import '../static/style/pages/404.less'
import Link from 'next/link'
const Error = () => {
  const pageList = {
    '首页': '/index',
    '文章': '/list',
    '生活': 'list'
  }
  return (
    <>
      <div className="error-page">
        <div className='error-main'>
          <div className='error-main-header'>
            <img src="img/header.jpg"></img>
            <div>您所进入的页面已丢失呐~点击下方链接跳转至其他页面哦</div>
            <div className="error-button">
              {
                Object.entries(pageList).map(([key,value])=>(
                <Link href={value}><button className="btn">{key}</button></Link>
                ))
              }
              <a href='https://www.baidu.com/'><button className="btn">百度</button></a>
            </div>
          </div>
          <div className="error-filter"></div>
        </div>
      </div>
      <style jsx>
        {
          `
         .error-page{
          background:url(img/error-bg.jpg) top left no-repeat #666666
         }
        `
        }
      </style>
    </>
  )
}


export default Error