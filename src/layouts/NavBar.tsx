import React from 'react'
import { Menu } from 'antd'
import { Link } from 'umi'
import { menuData } from './menudata'
import {
    HomeOutlined,
    UserSwitchOutlined,
    UnorderedListOutlined,
    ShopOutlined,
    ApartmentOutlined,
    DotChartOutlined,
    BookOutlined,
    UsergroupAddOutlined,
    SolutionOutlined,
    SettingOutlined
} from '@ant-design/icons';

const { SubMenu } = Menu

const iconData = {
    'HomeOutlined': <HomeOutlined />,
    'UserSwitchOutlined': <UserSwitchOutlined />,
    'UsergroupAddOutlined': <UsergroupAddOutlined />,
    'ApartmentOutlined': <ApartmentOutlined />,
    'ShopOutlined': <ShopOutlined />,
    'UnorderedListOutlined': <UnorderedListOutlined />,
    'SolutionOutlined': <SolutionOutlined />,
    'SettingOutlined': <SettingOutlined />,
    'BookOutlined': <BookOutlined />,
}

const getMenuKeyFromUrl = (pathname) => {
    let selmenu = pathname === '/' ? ['home'] : [pathname.substr(1)];
    pathname = pathname.split('/');
    if (pathname.length > 1)
        selmenu.push(pathname[1]);
    //console.log('pathname',pathname,selmenu);
    return selmenu;//pathname.substr(1);
}

const getOpenKey = (selkey, menuMain) => {
    for (let key in menuMain) {
        let menu = menuMain[key];
        if (menu === selkey && !menu.children) return selkey;
        if (menu.children) {
            for (let m in menu.children) {
                let c = menu.children[m];
                if (c.key === selkey)
                    return c.parent;
            }
        }
    }
    return null;
}

const getLngMenuText = (text, locale = 'zh_CN') => {
    if (typeof text !== 'object') return text;
    return text[locale];
}

const renderMenu = (locale) => {
    console.log("locale", locale)
    var menus = [];
    for (let key in menuData) {
        let menu = menuData[key];
        if (menu.children && menu.children.length) {
            menus.push(
                <SubMenu key={menu.key} icon={iconData[menu.icon]} title={menu.text}>
                    {
                        menu.children.map(c1 => {
                            return <Menu.Item key={c1.key}><Link to={c1.to}>{c1.text}</Link></Menu.Item>
                        })
                    }
                </SubMenu>
            )
        } else {
            menus.push(
                <Menu.Item key={menu.key} icon={iconData[menu.icon]}>
                    <Link to={menu.to}>{getLngMenuText(menu.text, locale)}</Link>
                </Menu.Item>
            )
        }
    }
    return menus
}


const NavBar = ({ loading, pathname, locale }) => {

    const selectedKey = getMenuKeyFromUrl(pathname);
    const openKeys = getOpenKey(selectedKey[0], menuData);

    return (
        <>
            <Menu
                theme="dark"
                mode="inline"
                selectedKeys={selectedKey}
                defaultOpenKeys={[openKeys]}
            >
                {renderMenu(locale)}
            </Menu>
        </>
    )
}

export default NavBar