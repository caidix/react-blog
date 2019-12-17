import React from 'react'
import './index.css'
import { Row, Col, Menu, Icon } from 'antd'
import Link from 'next/link'
import Router from 'next/router'
const Header = () => {
    const handleClick = (e)=>{
        console.log(e)
        if(e.key=='home'){
            Router.push('/index')
        }else{
            Router.push('/list?id='+e.key)
        }
    }
    return (
        <div className='header'>
            <Row type="flex" justify="center">
                <Col className="header-logo" xs={24} sm={24} md={10} lg={15} xl={12}>
                    <span className="header-logo">CD</span>
                    <span className="header-txt">记录生活，博客起点</span>
                </Col>
                <Col className="memu-div" xs={0} sm={0} md={14} lg={8} xl={6}>
                    <Menu mode="horizontal" onClick={handleClick}>
                        <Menu.Item key="home">
                            <Icon type="home" />
                            首页
                </Menu.Item>
                        <Menu.Item key="video">
                            <Icon type="youtube" />
                            视频
                </Menu.Item>
                        <Menu.Item key="life">
                            <Icon type="smile" />
                            生活
                </Menu.Item>
                    </Menu>
                </Col>
            </Row>
        </div>
    )
}
export default Header;