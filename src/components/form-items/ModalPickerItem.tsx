/**
 * @author shaorencen@yodinfo.com
 * @Component
 * @description
 */
import React, { Component, CSSProperties } from 'react';
import cls from 'classnames';
import { Field, IMutators } from '@formily/react';
import { List } from 'antd-mobile';
import 'antd-mobile/lib/search-bar/style/index';
import 'antd-mobile/lib/nav-bar/style/index';
import 'antd-mobile/lib/icon/style/index';
import { BizModalPicker, BizAvatar } from 'antd-mobile-exui';
import { BizModalPickerProps } from 'antd-mobile-exui/lib/biz-modal-picker/index';

import './InputItem.less';
import TagClose from './TagClose';
import { FieldLabel } from './CommFiled';
import { ErrorMsg, BaseFiledProps, DescMsg, RequireTips } from './CommFiled';

interface ModalPickerItemProps extends BaseFiledProps {
  style?: CSSProperties;
  className?: string;
  renderResult?: (valueItems: any[], mutators: IMutators) => React.ReactNode;
  pickerProps?: Omit<BizModalPickerProps, 'value' | 'style'> & {
    style?: CSSProperties;
  };
  actions?: any;
}
type State = {};

export default class extends Component<ModalPickerItemProps, State> {
  state = {
    showItems: [],
  };
  isUpdated = false;
  static defaultProps = {
    style: {},
    pickerProps: {},
    requireTipsProps: {},
    labelProps: {},
    errorMsgProps: {},
    descMsgProps: {},
    listItemProps: {},
    layout: 'row',
  };

  inputRef: any;
  constructor(props: ModalPickerItemProps) {
    super(props);
  }
  componentDidMount() {}
  handleMultiple = (value: any) => {
    const multiple = (this.props.pickerProps as any).multiple;
    if (multiple) {
      return value;
    } else {
      return [value];
    }
  };
  render() {
    const {
      label,
      desc,
      pickerProps,
      requireTipsProps,
      className,
      style,
      errorMsgProps,
      descMsgProps,
      listItemProps,
      placeholder,
      actions,
      renderResult,
    } = this.props;
    const multiple = (pickerProps as any).multiple;
    const { required, ...restProps } = this.props;
    return (
      <Field {...restProps}>
        {({ state, mutators }) => {
          const item = this.handleMultiple(state.value)
            .map((item: any) => {
              return (pickerProps as any).list.find(
                (e: any) => e.value == item,
              );
            })
            .filter((e: any) => e);
          console.log('item', item);
          return (
            <div className={className} style={style}>
              <BizModalPicker
                {...(pickerProps as any)}
                value={state.value}
                onConfirm={e => {
                  if (multiple) {
                    // ps 需要先 remove 再 change ，不然有 bug，（onConfirm 变化了，但是mutators.change 没有触发更新）
                    state.value.map((e: any, index: number) => {
                      mutators.remove(index);
                    });
                  }
                  mutators.change(e);
                }}
              >
                <List.Item
                  arrow="horizontal"
                  extra={placeholder}
                  {...listItemProps}
                >
                  {label}
                  {required && <RequireTips {...requireTipsProps} />}
                </List.Item>
              </BizModalPicker>
              {renderResult ? (
                renderResult(multiple ? item : state.value, mutators)
              ) : item.length == 0 ? null : (
                <div
                  className="fbox mt-sm mlr-lg pb-md"
                  style={{ flexWrap: 'wrap' }}
                >
                  {item.map((el: any, index: number) => {
                    return (
                      <TagClose
                        key={el.value}
                        className="mr-md tx-c fs24 mb-md"
                        onClose={() => {
                          multiple
                            ? mutators.remove(index)
                            : mutators.change(undefined);
                        }}
                      >
                        {el.label}
                      </TagClose>
                    );
                  })}
                </div>
              )}
              <ErrorMsg {...errorMsgProps} errors={state.errors} />
              <DescMsg {...descMsgProps} content={desc} />
            </div>
          );
        }}
      </Field>
    );
  }
}
