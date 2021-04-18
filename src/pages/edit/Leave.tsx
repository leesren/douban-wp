/**
 * @author shaorencen@yodinfo.com
 * @Component
 * @description
 */
import React, { Component } from 'react';
import cls from 'classnames';
import { List, Switch, WhiteSpace } from 'antd-mobile';
import { BizActionBar } from 'antd-mobile-exui';
import { Form, Field, createFormActions, LifeCycleTypes } from '@formily/react';
import styles from './index.less';
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

import './Leave.less';
type Props = {};
type State = {};
const list = [
  {
    label: '选项一',
    value: '0',
  },
  {
    label: '选项二',
    value: '1',
    disabled: true,
  },
  {
    label: '选项三',
    value: '3',
  },
  {
    label: '选项四',
    value: '4',
  },
  {
    label: '选项五',
    value: '5',
  },
  {
    label: '选项六',
    value: '6',
  },
  {
    label: '选项三',
    value: '2',
  },
];
const listData = Array(20)
  .fill(0)
  .map((e, index) => {
    return {
      disabled: index == 2,
      label: '姓名' + (index + 1),
      value: index + 1,
    };
  });
const getRandomData = (start = 1) => {
  return listData.slice(start, Math.floor(Math.random() * listData.length));
};
const actions = createFormActions();
export default class extends Component<Props, State> {
  state = {
    type: '',
    timeType: [],
    gender: '',
    visit: '',
    title: '',
    content: '',
    mobile: '',
    list: [],
    sign: false,
    signManager: false,
    images: [],
    listData: getRandomData(),
    selectUser: [],
  };
  constructor(props: Props) {
    super(props);
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState(
        {
          list: list,
          gender: '0',
          type: '3',
        },
        () => {
          console.log('setState');
          actions.setFieldValue('gender', '1');
          actions.setFieldValue('type', '3');
        },
      );
    }, 2400);
  }
  render() {
    const {} = this.props;
    let {
      type,
      list,
      gender,
      visit,
      title,
      sign,
      signManager,
      mobile,
      images,
      listData,
      selectUser,
      timeType,
    } = this.state;
    const that = this;
    return (
      <div style={{ overflow: 'auto' }} className="ptb-lg plr-lg flex">
        <Form
          actions={actions}
          effects={($, { validate, setFieldState }) => {
            $(LifeCycleTypes.ON_FORM_INIT).subscribe(() => {});

            $(LifeCycleTypes.ON_FIELD_VALUE_CHANGE, 'gender').subscribe(
              fieldState => {
                console.log(fieldState);
                setFieldState('visit', state => {
                  state.visible = fieldState.value == '1';
                });
              },
            );
            $(LifeCycleTypes.ON_FIELD_VALUE_CHANGE, 'signManager').subscribe(
              fieldState => {
                setFieldState('selectUser', state => {
                  state.visible = fieldState.value;
                });
              },
            );
          }}
        >
          <PickerSelectItem
            label="请假类型"
            placeholder="请选择"
            name="type"
            options={list}
            required
            value={type}
            desc="非年假不能超过5天"
            rules={[
              { required: true, type: 'error', message: '请选择请假类型' },
            ]}
          />
          <CheckboxModalItem
            label="时间"
            placeholder="请选择"
            name="timeType"
            options={list}
            required
            value={timeType}
            rules={[{ required: true, type: 'error', message: '请选择时间' }]}
          />
          <RadioSwitchItem
            label="性别"
            name="gender"
            required
            value={gender}
            rules={[{ required: true, message: '请选择性别' }]}
            options={[
              {
                label: '男',
                value: '0',
              },
              {
                label: '女',
                value: '1',
              },
            ]}
          ></RadioSwitchItem>
          <RadioSwitchItem
            label="研究员拜访方式"
            name="visit"
            required
            value={visit}
            rules={[{ required: true, message: '请选择拜访方式' }]}
            options={[
              {
                label: '线上',
                value: '0',
              },
              {
                label: '线下',
                value: '1',
                disabled: true,
              },
            ]}
          ></RadioSwitchItem>
          <WhiteSpace className="bg-body" />
          <InputItem
            name="title"
            label={false}
            required={false}
            focus
            value={title}
            placeholder="请输入标题"
            layout="column"
            inputItemProps={{ clear: true }}
            labelProps={{ className: 'bg-white' }}
          ></InputItem>
          <WhiteSpace className="bg-body" />
          <TextareaItem
            name="content"
            label="用章事项说明"
            required={false}
            focus
            value={title}
            placeholder="请输入"
            layout="column"
            inputItemProps={{ clear: false, rows: 3, className: 'myTxa' }}
            labelProps={{ className: 'bg-white' }}
          ></TextareaItem>

          <WhiteSpace className="bg-body" />
          <SwitchItem
            name="signManager"
            label="是否主管审批"
            required={false}
            value={signManager}
          ></SwitchItem>
          <WhiteSpace className="bg-body" />
          <ModalPickerItem
            label="选择主管"
            name="selectUser"
            className="bg-white pb-sm"
            value={selectUser}
            actions={actions}
            rules={[{ required: true, message: '请选择主管' }]}
            pickerProps={{
              list: listData,
              multiple: true,
              valueKey: 'value',
              maxSelectNumber: 100,
              dispatch({ type, payload }) {
                console.log(type, payload);
                if (type == 'search/onChange') {
                  const ls = getRandomData();
                  that.setState({
                    listData: ls,
                  });
                }
              },
            }}
          ></ModalPickerItem>
          <WhiteSpace className="bg-body" />
          <InputItem
            name="mobile"
            label={'联系电话'}
            value={mobile}
            placeholder="请输入"
            inputItemProps={{ clear: true }}
            labelProps={{ className: 'bg-white' }}
          ></InputItem>
          <WhiteSpace className="bg-body" />
          <ImagePickerItem
            label="添加图片(选填)"
            name="images"
            required
            rules={[{ required: true, message: '请选择图片' }]}
            className="bg-white pb-sm"
            value={images}
          ></ImagePickerItem>
          <WhiteSpace className="bg-body" />
        </Form>
        <div style={{ height: 170 }}></div>
        <div className={'bg-white ' + styles['navFooter']}>
          <div className="p-lg">
            <BizActionBar.BarButton
              size="small"
              type="warning"
              rounded
              onClick={() => {
                const result = actions.validate();
                console.log(actions.getFormState(state => state.values));
              }}
              style={{
                height: 40,
                lineHeight: '40px',
                backgroundColor: 'rgb(114, 50, 221)',
                flex: 3,
              }}
            >
              提交
            </BizActionBar.BarButton>
          </div>
        </div>
      </div>
    );
  }
}
