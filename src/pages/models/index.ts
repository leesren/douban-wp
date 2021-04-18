import { Effect, Subscription, Model, EffectsCommandMap } from 'dva';
import { Reducer } from 'redux';

export interface IndexModelState {
  info: Object;
}
export interface IndexModelType extends Model {
  state: IndexModelState;
  effects: typeof model['effects'];
  reducers: typeof model['reducers'];
  subscriptions: { setup: Subscription };
}
const model = {
  namespace: 'index',
  state: {
    info: {},
  },
  reducers: {
    save(state: IndexModelState, { payload }: any) {
      return { ...state, info: payload.data };
    },
  },
  effects: {
    *fetch({}, { put }: EffectsCommandMap) {
      yield put({
        type: 'save',
        payload: { data: { age: 12, sex: 'BOY' } },
      });
    },
  },
};
export default model;
