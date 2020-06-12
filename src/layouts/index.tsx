import React, { Component } from 'react'
import { Layout, BackTop } from 'antd';
import { history } from 'umi';
import TopBar from './TopBar'
import HeaderBar from './HeaderBar'
import NavBar from './NavBar'
import { isLogin } from '@/utils/auth';
import './layout.less'


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
        const { collapsed } = this.state;
        const { location } = this.props;

        // 登陆校验
        if(!isLogin()) {
            if(location.pathname != '/login' && location.pathname != '/register') {
               history.push('/login');
            }
        }

        // layout 判断
        if (location.pathname === '/login' || location.pathname === '/register' ) {
            return <div>{ this.props.children }</div>
        }

        return (
            <Layout>
                <Sider trigger={null} collapsible collapsed={collapsed} collapsedWidth="0">
                    <div className="logo" style={{ fontSize: "20px", color: "white", textAlign:"center", lineHeight: "60px"}}>Logo</div>
                    <NavBar></NavBar>
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
        );
    }
}

export default BaseLayout