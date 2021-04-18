import { fetchUser } from '@/services/global-service';
import { Effect, Subscription, Model, EffectsCommandMap } from 'dva';
import { Reducer } from 'redux';
import Cookies from 'js-cookie';
import { projectConfig } from '@/config';
export interface GlobalModelState {
  userInfo: Object | undefined;
  isFetchAuth: boolean;
}
export interface GlobalModelType extends Model {
  state: GlobalModelState;
  effects: {
    fetch: Effect;
  };
  reducers: {
    // 启用 immer 之后
    save: Reducer<GlobalModelState>;
  };
}
export default {
  namespace: 'global',
  state: {
    userInfo: undefined,
    isFetchAuth: true,
  },
  reducers: {
    save(state: GlobalModelState, { payload }: any) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *fetch({}, { put, call }: EffectsCommandMap) {
      try {
        const data = yield call(fetchUser, 2);
        Cookies.set(projectConfig.ACCESS_TOKEN, data.token);
        yield put({
          type: 'save',
          payload: {
            userInfo: data.userInfo,
            isFetchAuth: false,
          },
        });
      } catch (error) {
        console.error(error);
      }
    },
  },
} as GlobalModelType;
