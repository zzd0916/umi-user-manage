const menuObject = {
    home: {
        key: 'home',
        to: '/',
        text: {
            en_US: 'Home Page',
            zh_CN: '系统首页',
            ja_JP: 'ホームページ',
        },
        icon: 'HomeOutlined'
    },
    role: {
        key: 'role',
        to: '/role',
        text: {
            en_US: 'Role Management',
            zh_CN: '角色管理',
            ja_JP: 'キャラクター管理',
        },
        icon: 'UserSwitchOutlined'
    },
    user: {
        key: 'user',
        to: '/user',
        text: {
            en_US: 'User Management',
            zh_CN: '用户管理',
            ja_JP: 'ユーザー管理',
        },
        icon: 'UsergroupAddOutlined'
    },
    shop: {
        key: 'shop',
        to: '/shop',
        text: {
            en_US: 'Shop Management',
            zh_CN: '门店管理',
            ja_JP: '店舗管理',
        },
        icon: 'ShopOutlined'
    },
    report: {
        key: 'report',
        to: '/report',
        text: {
            en_US: 'Report Query',
            zh_CN: '报告查询',
            ja_JP: 'レポートクエリ',
        },
        icon: 'UnorderedListOutlined'
    },
    record: {
        key: 'record',
        to: '/record',
        text: {
            en_US: 'Testing Record',
            zh_CN: '检测记录',
            ja_JP: '検出データ記録',
        },
        icon: 'SolutionOutlined'
    },
    dictionary: {
        key: 'dictionary',
        to: '/dictionary',
        text: {
            en_US: 'Dictionary Management',
            zh_CN: '字典管理',
            ja_JP: '辞書管理',
        },
        icon: 'BookOutlined'
    },
    param: {
        key: 'param',
        to: '/param',
        text: {
            en_US: 'Parameter Settings',
            zh_CN: '参数设置',
            ja_JP: 'パラメータ設定',
        },
        icon: 'SettingOutlined'
    },
    device: {
        key: 'device',
        to: '/device',
        text: {
            en_US: 'Equipment management',
            zh_CN: '终端管理',
            ja_JP: '端末管理',
        },
        icon: 'ApartmentOutlined'
    },
}

export const menuData = menuObject