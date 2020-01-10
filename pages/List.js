import React, { useState } from 'react'
import { Row, Col, List as ListAntd, Icon, Breadcrumb, Tag } from 'antd'
import Layout from '../components/Layout'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Router from 'next/router'
import http from '../utils/http'
import moment from 'moment'
import Link from 'next/link'
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
import '../static/style/pages/List.less'


const List = (props) => {
  const [articleList, setArticleList] = useState(props.info || [])
  const [clickedTag, setClickedTag] = useState(0)
  const tagColor = ['purple', 'red', 'gold', 'green', 'cyan', 'magenta', 'geekblue', 'blue'];

  const tags = (item) => {
    return item.length > 0 && item.map((cat, num) => {
      return (<li key={num}><Tag color={tagColor[(num % tagColor.length)]}>{cat.name}</Tag></li>)
    })
  }
  const routePush = (id) => {
    Router.push('/detail?id=' + id)
  }
  const renderer = new marked.Renderer();
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    sanitize: false,
    xhtml: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }
  });
  const getArticle = async (_id, index = 0) => {
    let params = {}
    setClickedTag(index)
    if (_id) {
      params._id = _id;
    }
    const data = await http.get('article/list', { params }).then(
      ({ data }) => {
        console.log(data)
        if (data.code === 0)
          setArticleList(data.data.info)
      }
    );
  }
  const TagList = () => {
    const tags = props.tag;
    return (<div className="tag-list">
      <button className={clickedTag === 0 ? 'active' : ''} onClick={() => { getArticle() }}>全部文章</button>
      {tags.length > 0 && tags.map((item, index) => (
        <button className={index + 1 === clickedTag ? 'active' : ''} key={item.name} onClick={() => { getArticle(item._id, index + 1) }}>{item.name}</button>
      ))
      }
    </div >)
  }
  return (
    <Layout title="文章列表">
      <Row className="comm-main" type="flex" justify="center">
        <Col xs={24} sm={24} md={16} lg={18} xl={14}  >
          <div className="comm-left">
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                <Breadcrumb.Item>文章列表</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <TagList />
          </div>

          <div className="comm-left">
            <ListAntd
              itemLayout="vertical"
              dataSource={articleList}
              renderItem={item => (
                <ListAntd.Item onClick={() => { routePush(item._id) }}>
                  <div className="main-list-left">
                    <div className="list-icon">
                      <ul className="meta-list">
                        <li className="item">{item.author}</li>
                        <li className="item"><Icon type="calendar" /> {moment(item.addTime).format('YYYY-MM-DD HH:mm:ss')}</li>
                        <li className="item" ><Icon type="fire" />{item.viewCount}</li>
                        {tags(item.category)}
                      </ul>
                    </div>
                    <div className="list-title">{item.title}</div>
                    <div className="list-context" dangerouslySetInnerHTML={{ __html: marked(item.introduction) }}></div>
                  </div>
                  <div className="main-list-right"></div>
                </ListAntd.Item>
              )}
            />

          </div>
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
        </Col>
      </Row>
      <style jsx>
        {`
        
        `}
      </style>
    </Layout>
  )
}

List.getInitialProps = async () => {
  const data = await http.get('article/list', { params: { limit: 10 } }).then(
    (res) => {
      // console.log('远程获取数据结果:', res.data.data)
      return (res.data.data)
    }
  );
  const tag = await http.get('tag/list').then(
    ({ data }) => {
      if (data.code === 0) {
        return data.data;
      }
    }
  )
  return { info: data.info, tag: tag };
}

export default List
