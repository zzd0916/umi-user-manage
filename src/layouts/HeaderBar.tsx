import React, { Component } from 'react'
import { Layout, Radio, Menu, Dropdown, message } from 'antd'
import { Link, history } from 'umi'
// import { logOut } from '@/utils/auth'
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    DownOutlined
} from '@ant-design/icons';
const { Header } = Layout;

interface IProps {
    onClickHander: () => void;
    collapsed: boolean;
}

class HeaderBar extends Component<IProps> {
    logout() {
        // logOut()
        history.push('/login');
        message.success('logout out success');
    }
    render() {
        const menu = (<Menu>
            <Menu.Item key="0"><Link to="/user/info">个人信息</Link></Menu.Item>
            <Menu.Item key="1"><Link to="/user/pwd">修改密码</Link></Menu.Item>
            <Menu.Item key="2"><span onClick={this.logout}>退出登陆</span></Menu.Item>
        </Menu>)
        return (
            <Header className="site-layout-background" style={{ padding: '0 20px' }}>
                <div onClick={this.props.onClickHander} >
                    {this.props.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </div>
                <div className="header-right">
                    <label className="lang-label">语言切换：</label>
                    <Radio.Group className="lang-wrapper" defaultValue="zh-CH">
                        <Radio.Button value="zh-CH">中文</Radio.Button>
                        <Radio.Button value="en-US">English</Radio.Button>
                        <Radio.Button value="ja-JP">日语</Radio.Button>
                    </Radio.Group>
                    <Dropdown overlay={menu}>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            系统管理员
                        <DownOutlined />
                        </a>
                    </Dropdown>

                </div>
            </Header>
        )
    }
}

export default HeaderBar


