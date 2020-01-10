import React, { useState } from 'react'
// import '../static/style/pages/Detail.less'
import { Row, Col, Affix, Icon, Breadcrumb, Tag, Divider, Skeleton } from 'antd'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Layout from '../components/Layout'
import Tocify from '../components/setTitle.tsx'
import http from '../utils/http'
import moment from 'moment'

import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
import 'markdown-navbar/dist/navbar.css';

let markdown = '# P01:课程介绍和环境搭建\n' +
  '[ **M** ] arkdown + E [ **ditor** ] = **Mditor**  \n' +
  '> Mditor 是一个简洁、易于集成、方便扩展、期望舒服的编写 markdown 的编辑器，仅此而已... \n\n' +
  '**这是加粗的文字**\n\n' +
  '*这是倾斜的文字*`\n\n' +
  '***这是斜体加粗的文字***\n\n' +
  '~~这是加删除线的文字~~ \n\n' +
  '\`console.log(111)\` \n\n' +
  '\`import App from \'next/app\'\` \n\n' +
  '# p02:来个Hello World 初始Vue3.0\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n' +
  '***\n\n\n' +
  '# p03:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n' +
  '# p04:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n' +
  '#5 p05:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n' +
  '# p06:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n' +
  '# p07:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n' +
  '``` var a=11; ```'

const Detail = (props) => {
  const { info } = props;
  const [tocify, setTocify] = useState(new Tocify())
  const renderer = new marked.Renderer();
  console.log(props)
  renderer.heading = function (text, level, raw) {
    const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  };
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }
  });

  let html = marked(info.articleContent)


  return (
    <>
      <Layout title={'博客详细页'}>
        <Row className="comm-main" type="flex" justify="center">
          <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
            <div>
              <div className="bread-div">
                <Breadcrumb>
                  <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                  <Breadcrumb.Item>{info.category.length > 0 && info.category[0].name}</Breadcrumb.Item>
                  <Breadcrumb.Item>{info.title}</Breadcrumb.Item>
                </Breadcrumb>
              </div>

              <div>
                <div className="detailed-title">
                  {info.title}
                </div>

                <div className="list-icon center">
                  <span className="item">{info.author}</span>
                  <span className="item"><Icon type="calendar" /> {moment(info.addTime).format('YYYY-MM-DD HH:mm:ss')}</span>
                  <span className="item"><Icon type="fire" /> {info.viewCount}</span>
                  {
                    info.category.length > 0 && info.category.map((item, index) => (
                      <span key={index}><Tag>{item.name}</Tag></span>
                    ))
                  }
                </div>
                {info.introduction.length > 0 ? (<div className="detail-introduction">{info.introduction.length}</div>) : <Divider />}
                <div className="detailed-content" dangerouslySetInnerHTML={{ __html: html }}>
                </div>

              </div>

            </div>
          </Col>

          <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
            <Author />
            <Advert />
            <Affix offsetTop={5}>
              <div className="detailed-nav comm-box">
                <div className="nav-title">文章目录</div>
                <div className="toc-list">
                  {tocify && tocify.render()}
                </div>
              </div>
            </Affix>
          </Col>
        </Row>
      </Layout>
      <style jsx>
        {`
        .bread-div{
          padding: .5rem;
          border-bottom:1px solid #eee;
          background-color: #e1f0ff;
        }
        .detailed-title{
          font-size: 1.8rem;
          text-align: center;
          padding: 1rem;
        }
        .center{
          text-align: center;
        }
        .item::after {
          content: "·";
          color: rgb(178, 186, 194);
          margin: 0px 0.4em;
        }
        .detailed-content{
          padding: 1.3rem;
          font-size: 1rem;
        }
        pre{
          display: block;
          background-color:#f3f3f3;
           padding: .5rem !important;
           overflow-y: auto;
           font-weight: 300;
           font-family: Menlo, monospace;
           border-radius: .3rem;
        }
        pre{
          background-color: #283646 !important;
        }
        pre >code{
          border:0px !important;
          background-color: #283646 !important;
          color:#FFF;
        
        }
        code {
          display: inline-block ;
          background-color:#f3f3f3;
          border:1px solid #fdb9cc;
          border-radius:3px;
          font-size: 12px;
          padding-left: 5px;
          padding-right: 5px;
          color:#4f4f4f;
          margin: 0px 3px;
        
        }
        .title-anchor{
          color:#888 !important;
          padding:4px !important;
          margin: 0rem !important;
          height: auto !important;
          line-height: 1.2rem !important;
          font-size: .7rem !important;
          border-bottom: 1px dashed #eee;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
        .active{
          color:rgb(30, 144, 255) !important;
        }
        .nav-title{
          text-align: center;
          color: #888;
          border-bottom: 1px solid rgb(30, 144, 255);
         
        }
        .article-menu{
          font-size:12px;
        }
        iframe{
          height: 34rem;
        }
        .detailed-content  img{
          width: 100%;
          border:1px solid #f3f3f3;
        }
        .title-level3{
          display: none !important;
        }
        .ant-anchor-link-title{
          font-size: 12px !important;
        }
        .ant-anchor-wrapper{
          padding: 5px !important;
        }
        
        .detail-introduction{
          border:3px solid #f6f6f6;
          text-align: center;
          padding: 5px;
          margin:5px 10px;
          box-shadow: 3px 3px 0 0 #f6f6f6;
        }
        `}
      </style>
    </>

  )

}
Detail.getInitialProps = async ({ query }) => {
  let data = await http.get(`article/findOne/${query.id}`).then(res => res.data.data);
  console.log(data)
  return data;
}

export default Detail
