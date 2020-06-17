import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import * as dictionaryService from '@/services/dictionary';
export interface ITabs {
    name: string;
    value: string;
    desc: string;
}

export interface MemberModelState {
  mark: string;
  readonly tabs: Array<ITabs>;
  list: Array<object>;
  ps: number;
  p: number;
  count: number;
}

export interface MemberModelType {
  namespace: 'dictionaryMember';
  state: MemberModelState;
  effects: {
    getList: Effect;
  };
  reducers: {
    setList: ImmerReducer<MemberModelState>;
  };
  subscriptions: { setup: Subscription };
}

const MemberModel: MemberModelType = {
  namespace: 'dictionaryMember',
  state: {
    mark: 'memberSource',
    tabs: [
        {name: '会员来源', value: 'memberSource', 'desc':'检测用户来源'},
        {name: '合作商类型', value: 'franchiserType', 'desc':'授权合作商类型'},
        {name: '地区', value: 'region', 'desc':'系统支持的国家地区选择'},
        {name: '场景', value: 'scene', 'desc':'采集客户端使用场景'},
    ],
    list: [],
    ps: 10,
    p: 1,
    count: 0
  },
  effects: {
    *getList({ payload: { p = 1 , mark="memberSource" } }, { call, put }) {
        // console.log('effect getList')
        const { list, count } = yield call(dictionaryService.getList, { p, mark });
        console.log( list , count )
        yield put({
          type: 'setList',
          payload: {
            list,
            count
          },
        });
      },
  },
  reducers: {
    setList(state, { payload: {list, count } }) {
        return { ...state, list, count};
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
          // console.log('pathname', pathname)
        if (pathname === '/system/dictionary') {
          dispatch({
            type: 'getList',
          })
        }
      });
    }
  }
};
export default MemberModel;