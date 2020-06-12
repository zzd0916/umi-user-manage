import React, { Component } from 'react'
import logoSrc from '@/assets/images/logo-login.png'
import { Form, Input, Button, Radio, message, Modal } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { history } from 'umi'
import { Store } from 'antd/es/form/interface';
import http from '@/utils/http'
import { setLogin } from '@/utils/auth'

import './login.less'

class Login extends Component {

  state = {
    formList: [
      {}
    ],
    loading: false
  }

  onFinish = (values: Store) : void => {
    this.setState({
      loading: true
    })
    http.post('/api/account/signIn',{
      data: {
        name: values.username,
        pwd: values.password
      }
    }).then( res => {
      if(res.data && res.data._id) {
        setLogin(res.data)
        message.success('log in success')
        history.push('/')
      }
    }).catch( e => {
    }).finally ( () => {
      this.setState({
        loading: false
      })
    })
  };

  render() {
    const { loading } = this.state
    return (
      <div className="login">
         <div className="login-lang">
            <label className="lang-label">语言切换：</label>
            <Radio.Group className="lang-wrapper" defaultValue="zh-CH" size="small">
                <Radio.Button value="zh-CH">中文</Radio.Button>
                <Radio.Button value="en-US">English</Radio.Button>
                <Radio.Button value="ja-JP">日语</Radio.Button>
            </Radio.Group>
        </div>
        <div className="login-box">
          <img src={logoSrc} width="100%" alt="" />
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={ this.onFinish }
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your Username!',
                },
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                autoComplete="off"
              />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} className="login-form-button"> Log in </Button>
          </Form>
        </div>
      </div>
    )
  }

}
export default Login 