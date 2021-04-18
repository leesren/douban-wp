/**
 * @author shaorencen@yodinfo.com
 * @Component
 * @description
 */
import React, { Component, CSSProperties } from 'react';
import cls from 'classnames';
import { Form, Field, createFormActions } from '@formily/react';
import { BizRadio } from 'antd-mobile-exui';
import { List } from 'antd-mobile';
import {
  ErrorMsg,
  BaseFiledProps,
  RadioOptions,
  DescMsg,
  RequireTips,
} from './CommFiled';

interface PickerSelectItemProps extends BaseFiledProps {
  options: RadioOptions['options'];
  style?: CSSProperties;
  className?: string;
}
type State = {};

export default class extends Component<PickerSelectItemProps, State> {
  state = {};
  static defaultProps = {
    style: {},
    listItemProps: {},
    requireTipsProps: {},
    errorMsgProps: {},
    descMsgProps: {},
  };
  constructor(props: PickerSelectItemProps) {
    super(props);
  }
  componentDidMount() {}

  render() {
    const {
      options,
      label,
      desc,
      listItemProps,
      requireTipsProps,
      className,
      style,
      errorMsgProps,
      descMsgProps,
    } = this.props;
    const { required, ...restProps } = this.props;
    return (
      <Field {...restProps}>
        {({ state, mutators }) => (
          <div className={className} style={style}>
            <List.Item
              {...listItemProps}
              extra={
                <BizRadio.Group
                  type="button"
                  value={state.value}
                  onChange={(e, index) => {
                    mutators.change(e);
                  }}
                >
                  {options.map((el: any, index: number) => {
                    return (
                      <BizRadio
                        value={el.value}
                        disabled={!!el.disabled}
                        key={index}
                      >
                        {el.label}
                      </BizRadio>
                    );
                  })}
                </BizRadio.Group>
              }
            >
              {label}
              {required && <RequireTips {...requireTipsProps} />}
            </List.Item>
            <ErrorMsg {...errorMsgProps} errors={state.errors} />
            <DescMsg {...descMsgProps} content={desc} />
          </div>
        )}
      </Field>
    );
  }
}
