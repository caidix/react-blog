import React from 'react'
import '../static/style/components/Header.less'
import { Row, Col, Menu, Icon, Collapse } from 'antd'
import Router from 'next/router'
const { SubMenu } = Menu;
const pageList = {
    'HOME': '/index',
    'LIST': '/list',
    'LIFE': '/life'
}
class Header extends React.Component {
    constructor(props) {
        super()
        this.state = {
            customPanelStyle: {
                background: '#7397ab',
                border: 0,
                overflow: 'hidden',
            },
            titleFixed: false
        }
    }
    handleClick = (e) => {
        Router.push(pageList[e.key])
    }
    handleScroll() {
        let offsetTop = this.myHeader.current.getBoundingClientRect().top;
        if (this.state.titleFixed !== (offsetTop < 0)) {
            this.setState({
                ...this.state,
                titleFixed: offsetTop < 0
            })
        }

    }
    render() {
        console.log(this.myHeader)
        return (
            <>
                {/* {this.state.titleFixed && <div style={{ height: '2.8rem', width: '100 %' }}></div>} */}
                {/* <div className={'header ' + (this.state.titleFixed ? 'isFixed' : '')} ref={this.myHeader}> */}
                <div className={'header '}>
                    <Row type="flex" justify="center">
                        <Col className="header-logo" xs={0} sm={0} md={10} lg={15} xl={12}>
                            <span className="header-logo">CD</span>
                            <span className="header-txt">二斤桃花酿作酒 万杯不及你温柔</span>
                        </Col>
                        <Col className="header-logo" xs={24} sm={24} md={0} lg={0} xl={0}>
                            <Collapse bordered={false} defaultActiveKey={['1']}>
                                <Collapse.Panel header={(
                                    <>
                                        <span className="header-logo">CD</span>
                                        <span className="header-txt">我见众生皆草木,唯你是青山</span>
                                    </>
                                )} key="1" style={this.state.customPanelStyle}>
                                    <ul className="header-list">
                                        <li onClick={() => { this.handleClick({ key: 'HOME' }) }}>
                                            首   页
                                    </li>
                                        <li onClick={() => { this.handleClick({ key: 'LIST' }) }}>
                                            文   章
                                    </li>
                                        <li onClick={() => { this.handleClick({ key: 'LIFE' }) }}>
                                            生   活
                                    </li>
                                    </ul>
                                </Collapse.Panel>
                            </Collapse>
                        </Col>
                        <Col className="menu-div" xs={0} sm={0} md={14} lg={8} xl={6}>
                            <Menu mode="horizontal" onClick={(e) => { this.handleClick(e) }}>
                                <Menu.Item key="HOME">
                                    <Icon type="home" />
                                    首页
                    </Menu.Item>
                                <Menu.Item key="LIST">
                                    <Icon type="container" />
                                    文章
                    </Menu.Item>
                                <Menu.Item key="LIFE">
                                    <Icon type="smile" />
                                    生活
                    </Menu.Item>
                            </Menu>
                        </Col>
                    </Row>
                </div>
            </>
        )
    }
}
Header.defaultProps = {
    currentTarget: global,
    relative: false,
};
console.log(Header.defaultProps)
// const Header = () => {

//     const handleClick = (e) => {
//         if (e.key == 'home') {
//             Router.push('/index')
//         } else {
//             Router.push('/list?id=' + e.key)
//         }
//     }
//     const customPanelStyle = {
//         background: '#c2ccd0',
//         border: 0,
//         overflow: 'hidden',
//     };
//     return (
//         <div className='header' refs="myHeader">
//             <Row type="flex" justify="center">
//                 <Col className="header-logo" xs={0} sm={0} md={10} lg={15} xl={12}>
//                     <span className="header-logo">CD</span>
//                     <span className="header-txt">二斤桃花酿作酒 万杯不及你温柔</span>
//                 </Col>
//                 <Col className="header-logo" xs={24} sm={24} md={0} lg={0} xl={0}>
//                     <Collapse bordered={false} defaultActiveKey={['1']}>
//                         <Collapse.Panel header={(
//                             <>
//                                 <span className="header-logo">CD</span>
//                                 <span className="header-txt">我见众生皆草木,唯你是青山</span>
//                             </>
//                         )} key="1" style={customPanelStyle}>
//                             <ul className="header-list">
//                                 <li onClick={() => { handleClick({ key: 'home' }) }}>
//                                     <Icon type="home" />
//                                     首页
//                                 </li>
//                                 <li onClick={() => { handleClick({ key: 'list' }) }}>
//                                     <Icon type="container" />
//                                     文章
//                                 </li>
//                                 <li onClick={() => { handleClick({ key: 'list' }) }}>
//                                     <Icon type="smile" />
//                                     生活
//                                 </li>
//                             </ul>
//                         </Collapse.Panel>
//                     </Collapse>
//                 </Col>
//                 <Col className="menu-div" xs={0} sm={0} md={14} lg={8} xl={6}>
//                     <Menu mode="horizontal" onClick={handleClick}>
//                         <Menu.Item key="home">
//                             <Icon type="home" />
//                             首页
//                 </Menu.Item>
//                         <Menu.Item key="list">
//                             <Icon type="container" />
//                             文章
//                 </Menu.Item>
//                         <Menu.Item key="life">
//                             <Icon type="smile" />
//                             生活
//                 </Menu.Item>
//                     </Menu>
//                 </Col>
//             </Row>
//         </div>
//     )
// }
export default Header;