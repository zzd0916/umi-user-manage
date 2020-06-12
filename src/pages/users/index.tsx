
import React, { useState } from 'react'
import { Table, Tag, Space } from 'antd';
import { connect } from 'umi'
import UserModal from './components/UserModal'

interface IProps {
    // loading:{};
    // router:{};
    users:  any;
}


const index = ({ users }) => {
    const [modalVisible, setModalVisible ] = useState(false)
    const [record, setRecord ] = useState(undefined)
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'create_time',
            dataIndex: 'create_time',
            key: 'create_time',
        },
        {
            title: 'update_time',
            dataIndex: 'update_time',
            key: 'update_time',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a onClick={ () => editHandler(record)}>edit</a> &nbsp;
                    <a>Delete</a>
                </Space>
            ),
        },
    ];

    const editHandler = record => {
        setRecord(record)
        showModal()
    }

    const showModal = () => {
        setModalVisible(true)
    }

    const okHandler = () => {
        closeHandler();
    }

    const closeHandler = () => {
        setModalVisible(false)
    }

    return (
        <div className="list-table">
            <Table columns={columns} dataSource={users.data} rowKey="id" />
            <UserModal visible={modalVisible} closeHandler={closeHandler} okHandler={okHandler} record={record} />
        </div>
    )
}

const mapStateToProps = ({users}) => {
    // 从 state 中取出 namespace 为 users 的 store
    // console.log(users)
    return {
        users
    }
}
export default connect(mapStateToProps)(index)


// export default connect(({ users}) => ({
//     users,
// }))(index)