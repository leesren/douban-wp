import { Effect, Subscription, Model, EffectsCommandMap } from 'dva';
import { Reducer } from 'redux';
import { fetchTodos, fetchLike, posts, update, fetchGroup } from '../services';
export interface HomeModelState {
  data: Object;
  likes: Object;
  groups: any[];
}
export interface HomeModelType extends Model {
  state: HomeModelState;
  effects: {
    fetch: Effect;
    fetchLike: Effect;
    fetchGroup: Effect;
  };
  reducers: {
    save: Reducer<HomeModelState>;
    // 启用 immer 之后
    // save: ImmerReducer<HomeModelState>;
  };
  subscriptions?: { setup: Subscription };
}
export default {
  namespace: 'home',
  state: {
    data: {
      list: [],
    },
    likes: {
      list: [],
    },
    groups: [],
  },
  reducers: {
    save(state: HomeModelState, { payload }: any) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *fetch({ payload }, { put, call }: EffectsCommandMap) {
      const data = yield call(posts, payload);
      yield put({
        type: 'save',
        payload: {
          data,
        },
      });
    },
    *fetchLike({ payload }, { put, call }: EffectsCommandMap) {
      const likes = yield call(fetchLike, payload);
      yield put({
        type: 'save',
        payload: {
          likes,
        },
      });
    },
    *fetchGroup({ payload }, { put, call }: EffectsCommandMap) {
      const groups = yield call(fetchGroup, payload);
      yield put({
        type: 'save',
        payload: {
          groups,
        },
      });
    },
    *doUpdate({ payload }: any, { put, call }: EffectsCommandMap) {
      // @ts-ignore
      return yield call(update, payload);
    },
  },
} as HomeModelType;
