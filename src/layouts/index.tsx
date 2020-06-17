import React, { Component } from 'react'
import { Layout, BackTop, ConfigProvider } from 'antd';
import { history,  injectIntl, getLocale } from 'umi';
import TopBar from './TopBar'
import HeaderBar from './HeaderBar'
import NavBar from './NavBar'
import { isLogin } from '@/utils/auth';
import './layout.less'

import en_US from 'antd/es/locale/en_US';
import zh_CN from 'antd/es/locale/zh_CN';
import ja_JP from 'antd/es/locale/ja_JP';

const lng = { zh_CN, en_US, ja_JP };

const { Sider, Content } = Layout;

// const BaseLayout = (props: any) => {
class BaseLayout extends Component {

    state = {
        collapsed: false
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed
        })
    };

    render() {
        console.log('render')
        const locale = getLocale();
        const { collapsed } = this.state;
        const { location, loading } = this.props;
        const { pathname } = location
        // 登陆校验
        if(!isLogin()) {
            if(pathname != '/login' && pathname != '/register') {
               history.push('/login');
            }
        }

        // layout 判断
        if (pathname === '/login' || pathname === '/register' ) {
            return <div>{ this.props.children }</div>
        }

        return (
            <ConfigProvider locale={lng[locale]}>
                <Layout>
                    <Sider trigger={null} collapsible collapsed={collapsed} collapsedWidth="0">
                        <div className="logo" style={{ fontSize: "20px", color: "white", textAlign:"center", lineHeight: "60px"}}>Logo</div>
                        <NavBar {...{loading, pathname ,locale}} ></NavBar>
                    </Sider>
                    <Layout className="site-layout">
                        <HeaderBar onClickHander={this.toggle} collapsed={collapsed} />
                        <TopBar />
                        <Content
                            className="site-layout-background"
                            style={{
                                margin: '0px 16px 24px 16px',
                                padding: 24,
                                minHeight: 280,
                            }}
                        >
                            {this.props.children}
                        </Content>
                    </Layout>
                    <BackTop />
                </Layout>
            </ConfigProvider>
        );
    }
}

export default BaseLayout