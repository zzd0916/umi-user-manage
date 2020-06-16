import React, { useState, FC } from 'react'
import { Table, Button, Popconfirm, message, Modal } from 'antd';
import { MemberModelState, ConnectRC, Loading, connect, Dispatch } from 'umi';

// interface IProps {
//     columns: Array<object>;
//     data: Array<object>;
// }
interface SingMemberType {
    _id: string
}

interface PageProps {
    dictionaryMember: MemberModelState;
    loading: boolean;
    dispatch: Dispatch;
}


const  Member:FC<PageProps> = ({ dispatch, dictionaryMember }) => {
    const [modalVisible, setModalVisible] = useState(false)

    
    const del = (item:SingMemberType) => {
        console.log('delete', item._id)
    }

    const visibleHandler = () => {
        setModalVisible(true)
    }
     
    const handleOk = () => {
        setModalVisible(false)
    }

    const handleCancel = () => {
        setModalVisible(false)
    }


    const { list } = dictionaryMember;

    const columns = [
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: '值',
            dataIndex: 'value',
            key: 'value',
        },
        {
            title: '扩展数据',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '描述',
            dataIndex: 'desc',
            key: 'desc',
        },
        {
            title: '操作',
            render: (item: SingMemberType) => (
                <span>
                    <Popconfirm
                        placement="top"
                        title="确定删除吗"
                        onConfirm={() => del(item)}
                        okText="确定"
                        cancelText="取消"
                    >
                        <Button>删除</Button>
                    </Popconfirm>
                </span>
            ),
        },
    ];
    
        
    return (
        <div>
            <Button onClick={visibleHandler}>编辑</Button>
                    <Modal
                        title="Basic Modal"
                        visible={modalVisible}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        >
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        </Modal>
            <Table
                columns={columns}
                rowKey='value'
                pagination={{ position: 'bottomRight' }}
                dataSource={list}
            />
        </div>
    )
}

// const mapStateToProps = ( {dispatch, dictionaryMember } ) => {
//     return {
//         dispatch,
//         dictionaryMember
//     }
// }

export default connect(({ dictionaryMember, loading }: { dictionaryMember: MemberModelState; loading: Loading }) => ({
    dictionaryMember,
    loading: loading.models.member,
}))(Member);

// export default connect(mapStateToProps)(Member)