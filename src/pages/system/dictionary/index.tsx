import React, { Component } from 'react';
import { DictionaryModelState, ConnectRC, Loading, connect } from 'umi';
import { Tabs, Button, Menu, Alert } from 'antd'
import ITabs from '@/models/system/dictionary'
import Region from './components/region'
// import FranchiserType from './components/franchiserType'
import Member from './components/member'
// import Scene from './components/scene'




import '../system.less'

export interface IColumns {
  title: string;
  dataIndex: string;
  key: string;
  render?: (text: any) => JSX.Element;
}

interface PageProps {
  dictionary: DictionaryModelState;
  loading: boolean;
  dispatch: Function;
}

interface ISearch {
  mark: string;
  ps: number;
  p: number;
}

export interface ITabs {
  name: string;
  value: string;
  desc: string;
}

type Ttab = 'memberSource' | 'franchiserType' | 'region' | 'scene' ;

interface IState {
  list: Array<object>;
  search: ISearch
  count: number;
  tabs: ITabs;
  tab: Ttab;
}

const { TabPane } = Tabs;
const { SubMenu } = Menu;

class Dictionary extends Component {
   // submenu keys of first level
   rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

   onOpenChange = openKeys => {
     const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
     if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
       this.setState({ openKeys });
     } else {
       this.setState({
         openKeys: latestOpenKey ? [latestOpenKey] : [],
       });
     }
   };

  state = {
    mark: '',
    tabs: [
      {name: '会员来源', value: 'memberSource', 'desc':'检测用户来源'},
      {name: '合作商类型', value: 'franchiserType', 'desc':'授权合作商类型'},
      {name: '地区', value: 'region', 'desc':'系统支持的国家地区选择'},
      {name: '场景', value: 'scene', 'desc':'采集客户端使用场景'},
    ],
    openKeys: ['sub1'],
  }
 
  UNSAFE_componentWillMount () {
  }

  tabChange(k:object) {
    this.setState({
      mark: k.key
    })
  }

  render() {
    const { tabs, mark } = this.state;
    const getComponent = () => {
      switch (mark) {
        case 'region': {
          return <Region />
        }
        case 'memberSource' : {
          return <Member />
        }
        case 'franchiserType' : {
          return <FranchiserType />
        }
        case 'scene' : {
          return <Scene />
        }
        default : {
          return (
            <Alert
              message="欢迎来到字典管理面版"
              description="请选择左侧的面板进行操作"
              type="info"
            />
          )
        }
      }
     
    }
    return (
      <div className="dictionary"> 
        <Menu
          onClick = { this.tabChange.bind(this) }
          mode="inline"
          className="left-content"
          openKeys={this.state.openKeys}
          // onOpenChange={this.onOpenChange}
          style={{ width: 256 }}
        >
          {
            tabs.map( (t:ITabs) => {
              return ( 
                <Menu.Item key={t.value} className="m-item" > 
                  {t.name} 
                  <p className="m-desc">{t.desc}</p>
                </Menu.Item>
               )
            })
          }
        </Menu>

        <div className="r-content">
          { mark }
          { 
           getComponent()
          }
        </div>
      
      </div>
    );
  }
}

export default Dictionary

// export default connect(({ dictionary, loading }: { dictionary: DictionaryModelState; loading: Loading }) => ({
//   dictionary,
//   loading: loading.models.dictionary,
// }))(Dictionary);