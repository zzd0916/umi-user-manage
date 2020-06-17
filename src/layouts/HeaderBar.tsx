import React, { Component } from 'react'
import { Layout, Radio, Menu, Dropdown, message } from 'antd'
import { Link, history, getLocale } from 'umi'
import tool from '@/utils/tool'
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    DownOutlined
} from '@ant-design/icons';
import LanguageSelect from '@/components/LanguageSelect'

const { Header } = Layout;

interface IProps {
    onClickHander: () => void;
    collapsed: boolean;
}

const logout = () => {
    // logOut()
    history.push('/login');
    message.success('logout out success');
}

const HeaderBar = (props) => {
    console.log(getLocale())
    const menu = (<Menu>
        <Menu.Item key="0"><Link to="/user/info">个人信息</Link></Menu.Item>
        <Menu.Item key="1"><Link to="/user/pwd">修改密码</Link></Menu.Item>
        <Menu.Item key="2"><span onClick={logout}>退出登陆</span></Menu.Item>
    </Menu>)
    
    const login = tool.power.getLogin();
        

    return(
        <Header className="site-layout-background" style={{ padding: '0 20px' }}>
            <div onClick={props.onClickHander} >
                {props.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </div>
            <div className="header-right">
                <LanguageSelect />
                <Dropdown overlay={menu}>
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        {login.name}
                    <DownOutlined />
                    </a>
                </Dropdown>
            </div>
        </Header>
    )
}

export default HeaderBar


