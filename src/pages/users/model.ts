import { Reducer, Effect, Subscription } from 'umi' 
import { getRemoteList } from './services'
export interface UserModelState {
}

export interface UserModelType {
    namespace: 'users',
    state: UserModelState,
    reducers: {
        getList: Reducer
    },
    effects: {
      getRemote: Effect
    },
    subscriptions: {
        setup: Subscription
    },

}
const UserModel: UserModelType = {
    namespace: 'users',
    state: {},
    reducers: {
      getList(state, { payload } ) {
          return payload
      }
    },
    effects: {
        *getRemote( { payload }, { call, put }) {
          const data = yield call(getRemoteList) 
          yield put({
            type:'getList',
            payload: data
          })
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({pathname}) => {
                if(pathname === '/users') {
                    dispatch({
                        type: 'getRemote'
                    })
                }
            })
        }
    }
}

export default UserModel