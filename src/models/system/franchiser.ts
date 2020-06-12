import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';

export interface ITabs {
    name: string;
    value: string;
    desc: string;
}

export interface FranchiserMode {
  mark: string;
  readonly tabs: Array<ITabs>;
  list: Array<object>;
  ps: number;
  p: number;
  count: number;
}

export interface FranchiserModelType {
  namespace: 'dictionary.franchiser';
  state: FranchiserMode;
  effects: {
    query: Effect;
  };
  reducers: {
    setList: ImmerReducer<FranchiserMode>;
  };
  subscriptions: { setup: Subscription };
}

const FranchiserModel: FranchiserModelType = {
  namespace: 'dictionary.franchiser',
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
    *query({ payload }, { call, put }) {
    },
  },
  reducers: {
    setList(state, { payload: { data: list, count, p } }) {
        return { ...state, list, count};
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/') {
          dispatch({
            type: 'query',
          })
        }
      });
    }
  }
};
export default FranchiserModel;