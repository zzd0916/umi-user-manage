import React from 'react';
import './index.less';
import indexLogo from '../../assets/images/index_bg.png'

export default () => {
  return (
    <div className="index">
      <h1 className="title">欢迎登录 动筛管理系统</h1>
      <img className="index-bg" src={indexLogo}  alt="动筛管理系统"/>
    </div>
  );
}
