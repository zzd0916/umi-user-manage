import { Reducer, Effect, Subscription } from 'umi' 
import { getRemoteList, editRecord, deleteRecord, addRecord } from './services'
import { message } from 'antd'
import { SingleUserType } from './data.d'

export interface UserState {
    data: SingleUserType[],
    meta: {
        total: number,
        per_page: number,
        page: number
    }
}

export interface UserModelType {
    namespace: 'users',
    state: UserState,
    reducers: {
        getList: Reducer<UserState>
    },
    effects: {
      getRemote: Effect
      edit: Effect,
      delete: Effect
      add: Effect
    },
    subscriptions: {
        setup: Subscription
    },

}
const UserModel: UserModelType = {
    namespace: 'users',
    state: {
        data: [],
        meta: {
            total: 0,
            per_page: 5,
            page: 1
        }
    },
    reducers: {
      getList(state, { payload } ) {
          return payload
      }
    },
    effects: {
        *getRemote( { payload }, { call, put }) {
          const data = yield call(getRemoteList) 
          if(data) {
            yield put({
              type:'getList',
              payload: data
            })
          }
        },
        *edit( { payload: { id, values }}, { call, put }){
            // console.log(id, values)
            const data = yield call(editRecord, {id, values})
            if(data) {
                message.success("Edit Successfully")
                yield put({
                    type:'getRemote'
                })
            } else {
                message.error("Edit failed")
            }
           
        },
        *add( { payload: { values }}, { call, put }){
            const data = yield call(addRecord, {values})
            if(data) {
                message.success("Add Successfully")
                yield put({
                    type:'getRemote'
                })
            } else {
                message.error("Add failed")
            }
        },
        *delete( { payload: { id }}, { call, put }){
            console.log(id)
            const data = yield call(deleteRecord, { id })
            if(data) {
                message.success("Delete Successfully")
                yield put({
                    type:'getRemote'
                })
            } else {
                message.error("Delete failed")
            }
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