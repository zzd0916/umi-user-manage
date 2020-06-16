"use strict";
import moment from 'moment';
import { stringify } from 'qs';
import { getLocale } from 'umi';

const yearNum = 365 * 24 * 3600 * 1000;

let tool = {
  log() {
    if (window.console) {
      console.log(...arguments);
    }
  },
  getLng(){
    let __lng = getLocale();
    if(!__lng) __lng = 'zh_CN';
    return __lng;
  },
  getCookie(c_name) {
    if (document.cookie.length > 0) {
      let c_start = document.cookie.indexOf(c_name + "=")
      if (c_start !== -1) {
        c_start = c_start + c_name.length + 1
        let c_end = document.cookie.indexOf(";", c_start)
        if (c_end === -1) c_end = document.cookie.length
        return unescape(document.cookie.substring(c_start, c_end))
      }
    }
    return ""
  },
};
tool.getTableChange = (page, filter, sort) => {
  let search = {
    p: page.current,
    ps: page.pageSize
  };
  for (let key in filter) {
    search[key] = filter[key];
  }
  if (sort.field) {
    search.$sort = `${sort.field},${sort.order}`
  }
  return search;
}
tool.valid = ({
  name = '',
  required,
  len,
  min,
  max,
  type,
  pattern,
  cls,
  fn
}) => {
  let rules = [];
  if (required) {
    rules.push({
      required: true,
      message: name + '不能为空'
    });
  }
  if (len) {
    rules.push({
      len: len,
      message: name + '只能' + len + '位'
    });
  }
  if (min) {
    rules.push({
      min: min,
      message: name + '至少' + min + '位'
    });
  }
  if (max) {
    rules.push({
      max: max,
      message: name + '最多' + max + '位'
    });
  }
  if (type) {
    rules.push({
      type: type,
      message: '不是有效的' + name + '数据'
    });
  }
  if (cls) {
    switch (cls) {
      case 'phone':
        pattern = /^((0\d{2,3}-\d{7,8})|(1[793584]\d{9}))$/;
        break;
      case 'email':
        pattern = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        break;
      case 'qq':
        pattern = /^[1-9][0-9]{4,10}$/;
        break;
      default:;
    }
  }
  if (pattern) {
    rules.push({
      pattern: new RegExp(pattern),
      message: name + '数据无效'
    });
  }
  if (fn) {
    rules.push({validator: fn});
  }
  if (type === 'array')
    return [
      {
        rules: rules
      }
    ];

  return {rules: rules, validateTrigger: 'onChange'};
};

tool.timeout = (fn, time) => {
  setTimeout(
    fn, time
    ? time
    : 10);
};

/**
 * 本地存储
 * @type {{set: ((name?, value?)), get: ((name?)), remove: ((name?))}}
 */
tool.local = {
  set(name, value) {
    if (typeof value === 'object')
      value = JSON.stringify(value);
    localStorage.setItem(name, value);
  },
  get(name) {
    let value = '';
    try {
      value = JSON.parse(localStorage.getItem(name));
    } catch (e) {
      value = localStorage.getItem(name);
    }
    return value;
  },
  remove(name) {
    localStorage.removeItem(name);
  }
};
tool.power = {
  /**
   * 获取用户的登录信息
   * @returns 登录信息对象
   */
  getLogin() {
    return tool.local.get('AdminLoginData');
  },
  /**
   * 获取用户所有的权限
   * @returns {*}
   */
  getPowers() {
    let login = tool.power.getLogin();
    if (!login || !login.role || !login.role.powers)
      return null;

    return login.role.powers;
  },
  /**
   * 设置登录信息
   * @param loginData
   * @returns {*}
   */
  setLogin(loginData) {
    return tool.local.set('AdminLoginData', loginData);
  },

  logout() {
    return tool.local.remove('AdminLoginData');
  },
  /**
   * 判断用户是否登录
   * @returns {boolean}
   */
  isLogin() {
    let login = this.getLogin();
    //tool.log('isLogin', login);
    return !!login;
  },
  /**
   * 是否拥有某项操作的权限
   * @param opname
   * @returns {boolean}
   */
  has(opname) {
     return true; // 测试阶段
    let powers = this.getPowers();
    if (!powers)
      return false;
    if (typeof opname === 'string')
      return powers
        ? powers[opname]
        : false;
    else if (opname.length)
      return opname.find(key => powers[key]);
    return false;
  },
  display(mark, dom) {
     return dom; // 测试阶段
    if(!mark) return null;
    if(typeof mark === 'string' || Array.isArray(mark)){
      return this.has(mark) ? dom : null;
    }
    // 权限范围判断（在服务端控制）
    // if(mark.shops){
    //   const login = this.getLogin();
    //
    // }
    return null;
  }
}
tool.array = {
  /**
   * 从数组里删除元素
   * @param 操作的数组
   * @param 需要删除的元素
   * @returns 删除后的数组
   */
  remove(arr, val) {
    let idx = -1;
    for (let i = 0, len = arr.length; i < len; i++)
      if (arr[i] === val) {
        idx = i;
        break;
      }
    if (idx !== -1)
      arr.splice(idx, 1);
    return arr;
  }
}

tool.object = {
  /**
   * 复制对象到另一个对象
   * @param from
   * @param to
   * @returns 新的对象
   */
  copy(from, to) {
    for (let key in from)
      to[key] = from[key];
    return to;
  },
  isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  },
  toUrlQueryString(o){
    return stringify(o);
  }
}

tool.string = {
  /**
   * 字符串分割为数组
   * @param str
   * @param split
   * @returns 数组
   */
  toArray(str, split) {
    if (typeof str === 'undefined')
      return str;
    if (Object.prototype.toString.call(str) === '[object Array]')
      return str;

    if (typeof str === 'string' && str.length > 0)
      return str.split(split);
    return null;
  },

  toMoment(str) {
    if (typeof str === 'undefined')
      return str;

    if (Object.prototype.toString.call(str) === '[object Object]')
      return str;

    if (typeof str === 'string' && str.length > 6)
      return moment(str);

    return null;
  },

  toDate(str,format = 'YYYY-MM-DD'){
    return moment(str).format(format);
  }
};
tool.date = {
  // 时间间隔
  timeSpan(form,to){

    let _timespan_ = Math.floor((to - form) / 1000);
    // console.log('timeSpan',form,to,_timespan_);
    const st = {
      isPassed:_timespan_ < 0
    };
    _timespan_ = Math.abs(_timespan_);
    if(_timespan_ > 86400){
      st.day = Math.floor(_timespan_ / 86400);
      _timespan_ = _timespan_ % 86400;
    }
    if(_timespan_ > 3600){
      st.hour = Math.floor(_timespan_ / 3600);
      _timespan_ = _timespan_ % 3600;
    }
    if(_timespan_ > 60){
      st.minute = Math.floor(_timespan_ / 60);
      _timespan_ = _timespan_ % 60;
    }
    st.second = _timespan_;
    return st;
  },
  toAge(birthday){
    return parseInt((new Date() - new Date(birthday)) / yearNum,10);
  }
};
export default tool;
