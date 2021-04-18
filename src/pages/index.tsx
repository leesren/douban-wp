/**
 * @author shaorencen@yodinfo.com
 * @description
 */

import React, { Component } from 'react';
import './index.less';
import router from 'umi/router';
import { Form, Field, createFormActions, LifeCycleTypes } from '@formily/react';
// @ts-ignore
import { HomeModelState } from './models/home';
import {
  PickerSelectItem,
  RadioSwitchItem,
  TextareaItem,
  InputItem,
  SwitchItem,
  ImagePickerItem,
  CheckboxModalItem,
  ModalPickerItem,
} from '@/components/form-items';
import { connect, DispatchProp } from 'dva';
import { BizActionBar, BizPageView } from 'antd-mobile-exui';
import { WhiteSpace } from 'antd-mobile';
import Item from './Item';
interface Props extends DispatchProp {
  home: HomeModelState;
  loading: boolean;
}
interface State { }
const actions = createFormActions();
class Page extends Component<Props, any> {
  constructor(props: Props) {
    super(props);
  }
  state = {
    not: '',
    keyword: ''
  };
  UNSAFE_componentWillMount() {
    this.load()
  }
  load = (query: any = {
    bank: false
  }) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'home/fetchLike', payload: {
        "query": {
          like: true
        },
        "take": 50,
        "pageNo": 1,
        "orderBy": {
          "lastDateTime": "desc"
        }
      }
    });
  }
  componentWillMount() {

  }

  update = async (id: any, data: any) => {
    const { dispatch } = this.props;
    try {
      await dispatch({ type: 'home/doUpdate', payload: { id, data } })
      this.load()
    } catch (error) {

    }

  }
  render() {
    let { not, keyword } = this.state;
    const { home, dispatch } = this.props
    return (
      <div className="pt-lg2 bg-white">
        <div className="pt-lg mb-lg">
        </div>
        {
          ((home.likes as any).list || []).map((item: any, idx: number) => {
            return (<Item index={idx + 1} key={idx} item={item} dispatch={dispatch} update={this.update} />

            )
          })
        }
        <div style={{ height: 80 }}></div>

      </div>
    );
  }
}
export default connect(({ home }: { home: HomeModelState }) => ({
  home,
}))(Page);
