/**
 * @author shaorencen@yodinfo.com
 * @description
 */

import React, { Component } from 'react';
import './index.less';
import router from 'umi/router';
import cls from 'classnames';
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
import { BizActionBar, BizPageView, BizPopup } from 'antd-mobile-exui';
import { WhiteSpace } from 'antd-mobile';
import Item from './Item'
interface Props extends DispatchProp {
  home: HomeModelState;
  loading: boolean;
}
interface State { }
const actions = createFormActions();
class Page extends Component<Props & any, any> {
  constructor(props: Props) {
    super(props);
    let query: any = sessionStorage.getItem('searchData');
    query = query ? JSON.parse(query) : {}
    this.state = {
      not: '',
      keyword: query.keyword,
      visible: false,
    };
  }
  UNSAFE_componentWillMount() {
    this.load({
      bank: false,
      like: false
    })
  }
  load = (query: any = {
    bank: false,
  }) => {
    const { dispatch, location } = this.props;
    dispatch({
      type: 'home/fetch', payload: {
        "query": {
          ...query,
          groupId: location.query.groupId ? +location.query.groupId : undefined
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
      this.search()
    } catch (error) {

    }

  }
  search = () => {
    actions.validate().then(e => {
      const data = actions.getFormState(state => state.values)
      console.log(data);
      const notTitle = (data.not || '').trim();
      const query = {
        "bank": false,
        "like": false,
        "title": { "contains": data.keyword },
        "NOT": notTitle ? {
          "title": { "contains": notTitle }
        } : undefined
      }
      this.load(query);
      sessionStorage.setItem('searchData', JSON.stringify({
        keyword: data.keyword,
        not: notTitle
      }))
      this.setState({
        visible: false
      })
    })
  }
  render() {
    let { not, keyword } = this.state;
    const { home, dispatch } = this.props
    return (
      <div className="pt-lg2 bg-white">

        {
          ((home.data as any).list || []).map((item: any, idx: number) => {
            return (<Item index={idx + 1} key={idx} item={item} dispatch={dispatch} update={this.update} />
            )
          })
        }
        <div style={{ height: 80 }}></div>
        <div className="fixItem" >
          <div className="fbox ptb-lg plr-lg2 biz-action-bar-btn-wrapper">
            <BizActionBar.BarButton
              style={{ backgroundColor: 'rgb(190, 153, 255)' }} onClick={() => {
                router.push('/like')
              }}

            >
              ????????????
          </BizActionBar.BarButton>
            <BizActionBar.BarButton
              type="warning"
              onClick={() => {
                this.setState({ visible: true })
              }}
              style={{
                backgroundColor: 'rgb(114, 50, 221)',
              }}
            >
              ??????
          </BizActionBar.BarButton>
          </div>
        </div>

        <BizPopup visible={this.state.visible}
          direction="bottom"
          onMaskClick={() => {
            this.setState({ visible: false })
          }}
          afterOpen={() => console.log('??????')}
          afterClose={() => console.log('??????')}
          destroy={false}
          mountContainer={() => document.body}>
          <div className="pt-lg bg-white">
            <Form
              actions={actions}
              effects={($, { validate, setFieldState }) => {

              }}
            >
              <InputItem
                name="keyword"
                label={false}
                value={keyword}
                placeholder="??????????????????"
                layout="column"
                inputItemProps={{ clear: true }}
                labelProps={{ className: 'bg-white' }}
                required={true}
                rules={[{ required: false, message: '??????' }]}
              ></InputItem>
              <WhiteSpace className="bg-body" />
              <TextareaItem
                name="not"
                label="??????"
                value={not}
                placeholder="?????????"
                layout="column"
                inputItemProps={{ clear: false, rows: 3, className: 'myTxa' }}
                labelProps={{ className: 'bg-white' }}

              ></TextareaItem>
            </Form>
            <BizActionBar.BarButton
              type="warning"
              block
              onClick={this.search}

            >
              ??????
          </BizActionBar.BarButton>
          </div>
        </BizPopup>
      </div>
    );
  }
}
export default connect(({ home }: { home: HomeModelState }) => ({
  home,
}))(Page);
