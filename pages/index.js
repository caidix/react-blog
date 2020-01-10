import React, { useState } from 'react'
import { Row, Col, List, Icon, Tag } from 'antd'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Layout from '../components/Layout'
import Router from 'next/router'
import http from '../utils/http.js'
import moment from 'moment'

import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css'

const Home = (props) => {
  console.log(props)
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
  if (props.info)
    return (
      <div>
        <Layout title="CD的个人博客">
          <Row className="comm-main" type="flex" justify="center">
            <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
              <div>
                <List
                  header={<div className="main-header">最新日志</div>}
                  itemLayout="vertical"
                  dataSource={props.info}
                  renderItem={item => (
                    <List.Item onClick={() => { routePush(item._id) }}>
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
                    </List.Item>
                  )}
                />
              </div>
            </Col>

            <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
              <Author />
              <Advert />
            </Col>
          </Row>
        </Layout>

      </div>
    )
  else return <div></div>
}
Home.getInitialProps = async () => {
  const res = await http.get('article/list').then(
    (result) => {
      console.log('远程获取数据结果:', result.data.data)
      return (result.data.data)
    }
  );
  return res;
}

export default Home
