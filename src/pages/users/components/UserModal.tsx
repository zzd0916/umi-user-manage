import React, { useEffect }from 'react'
import { Modal, Form, Input } from 'antd';

const UserModal = props => {
    // console.log('props', props )
    const [form] = Form.useForm();
    const { visible, record, okHandler, closeHandler } = props
    useEffect( () => {
        form.setFieldsValue(record)
    },[visible])

    return (
        <div>
            <Modal
                title="User Modal"
                visible={visible}
                onOk={okHandler}
                onCancel={closeHandler}
                forceRender
            >
                <Form
                    name="basic"
                    form={form}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Create Time"
                        name="create_time"
                        rules={[{ required: true, message: 'Please input your Create Time!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Status"
                        name="status"
                        rules={[{ required: true, message: 'Please input your status!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
export default UserModal