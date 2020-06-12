import { Breadcrumb, Alert } from 'antd'
import React, { Component } from 'react'
import { HomeOutlined } from '@ant-design/icons'
import { Link } from 'umi'
import './layout.less'

interface IList {
    name: string;
    path: string;
}

interface IProps  {
    list: Array<IList>;
    separator?: string;
}

class TopBar extends Component<IProps> {
    constructor(props: IProps) {
        super(props)
    }
    static defaultProps = {
        list : [
            { name: '系统管理', path: '/system/dictionary'},
            { name: '字典管理', path: '/system/dictionary'},
        ]
    }
    render() {
        const { list }  = this.props;
        return (
            <div className="topbar">
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to='/'>
                            <HomeOutlined />
                        </Link>
                    </Breadcrumb.Item>
                    {
                        list.map( nav => {
                            return (
                                <Breadcrumb.Item key={nav.name}>
                                    <Link to={nav.path}>{nav.name}</Link>
                                </Breadcrumb.Item>
                            )
                        })
                    }
                </Breadcrumb>
            </div>
        )
    }
}

export default TopBar