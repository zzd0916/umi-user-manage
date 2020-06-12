import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';

export interface ITabs {
    name: string;
    value: string;
    desc: string;
}

export interface RegionMode {
  mark: string;
  readonly tabs: Array<ITabs>;
  list: Array<object>;
  ps: number;
  p: number;
  count: number;
}

export interface RegionModelType {
  namespace: 'dictionary.region';
  state: RegionMode;
  effects: {
    query: Effect;
  };
  reducers: {
    setList: ImmerReducer<RegionMode>;
  };
  subscriptions: { setup: Subscription };
}

const RegionModel: RegionModelType = {
  namespace: 'dictionary.region',
  state: {
    mark: 'region',
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
export default RegionModel;