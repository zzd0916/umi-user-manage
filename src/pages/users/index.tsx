
import React, { FC, useState } from 'react'
import { Table, Button, Space, Popconfirm } from 'antd';
import { connect, Dispatch, Loading, UserState } from 'umi'
import { SingleUserType, FormValues } from './data.d'
import UserModal from './components/UserModal'

interface UserPageProps {
    users: UserState;
    dispatch: Dispatch;
    userListLoading: boolean;
}


const UserListPage:FC<UserPageProps>= ({ users, dispatch, userListLoading}) => {
    const [modalVisible, setModalVisible] = useState(false)
    const [record, setRecord] = useState<SingleUserType | undefined>(undefined)
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text:string) => <a>{text}</a>,
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
            render: (text:string, record:SingleUserType) => (
                <Space size="middle">
                    <a onClick={() => editHandler(record)}>edit</a> &nbsp;
                    <Popconfirm
                        title="确认删除吗?"
                        onConfirm={() => confirm(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <a>Delete</a>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const editHandler = (record: SingleUserType) => {
        showModal()
        setRecord(record)
    }
 
    const showModal = () => {
        setModalVisible(true)
    }

    const closeHandler = () => {
        setModalVisible(false)
    }

    const onFinish = (values: FormValues) => {
        let id = 0;
        if(record) {
            id = record.id;
        }
       if(id) {
        dispatch({
            type: 'users/edit',
            payload: {
                id,
                values
            }
        })
       } else {
        dispatch({
            type: 'users/add',
            payload: {
                values
            }
        })
       }
        
        closeHandler()
    };

    const confirm = (id:number) => {
        console.log(id)
        dispatch({
            type: 'users/delete',
            payload: {
                id
            }
        })
    }

    const addHandle = () => {
        setRecord(undefined)
        showModal()
    }

    return (
        <div className="list-table">
            <Button type="primary" onClick={addHandle}>Add</Button>
            <Table columns={columns} dataSource={users.data} rowKey="id" loading={userListLoading} />
            <UserModal visible={modalVisible} closeHandler={closeHandler} onFinish={onFinish} record={record} />
        </div>
    )
}

const mapStateToProps = ({ users, loading } : { users: UserState, loading: Loading }) => {
    // 从 state 中取出 namespace 为 users 的 store
    return {
        users,
        userListLoading: loading.models.users
    }
}
export default connect(mapStateToProps)(UserListPage)


// export default connect(({ users}) => ({
//     users,
// }))(index)