import React, { useEffect, FC } from 'react'
import { Modal, Form, Input, message } from 'antd';
import { SingleUserType, FormValues } from '../data.d' 
import './UserModal.less'

interface UserModalProps {
    visible: boolean;
     record: SingleUserType | undefined;
     closeHandler: () => void;
     onFinish: (values: FormValues) => void;
}

const UserModal: FC<UserModalProps> = props => {
    // console.log('props', props )
    const [form] = Form.useForm();
    const { visible, record, closeHandler, onFinish } = props
    useEffect(() => {
        if(record === undefined) {
            form.resetFields()
        } else {
            form.setFieldsValue(record)
        }
    }, [visible])

    const onOk = () => {
        form.submit()
    }

    const onFinishFailed = (error: any) => {
        message.error(error.errorFields[0].errors[0])
    };

    return (
        <div>
            <Modal
                title="User Modal"
                visible={visible}
                onOk={onOk}
                onCancel={closeHandler}
                forceRender
                maskClosable={false}

            >
                <Form
                    name="basic"
                    form={form}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
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