/**
 * @author shaorencen@yodinfo.com
 * @Component
 * @description
 */
import React, { Component, CSSProperties } from 'react';
import cls from 'classnames';
import { Field } from '@formily/react';
import { DatePicker, List } from 'antd-mobile';
import './InputItem.less';
import { PropsType } from 'antd-mobile/lib/date-picker/index';
import { FieldLabel, FieldLabelProps } from './CommFiled';
import { ErrorMsg, BaseFiledProps, DescMsg, RequireTips } from './CommFiled';

interface DatePickerItemProps extends BaseFiledProps {
  style?: CSSProperties;
  className?: string;
  focus?: boolean;
  dpItemProps?: PropsType & { style?: CSSProperties };
  layout?: 'column' | 'row';
  labelProps?: FieldLabelProps;
}
type State = {};

export default class extends Component<DatePickerItemProps, State> {
  state = {};
  static defaultProps = {
    style: {},
    dpItemProps: {},
    requireTipsProps: {},
    labelProps: {},
    errorMsgProps: {},
    descMsgProps: {},
    layout: 'row',
  };
  constructor(props: DatePickerItemProps) {
    super(props);
  }

  render() {
    const {
      label,
      desc,
      dpItemProps,
      requireTipsProps,
      className,
      style,
      placeholder,
      layout,
      labelProps,
      errorMsgProps,
      descMsgProps,
    } = this.props;
    const { required, ...restProps } = this.props;
    return (
      <Field {...restProps}>
        {({ state, mutators }) => (
          <div className={className} style={style}>
            <DatePicker
              {...dpItemProps}
              // mode="date"
              onChange={mutators.change}
              value={state.value}
              extra={placeholder}
            >
              <List.Item arrow="horizontal">
                {label}
                {required && <RequireTips {...requireTipsProps} />}
              </List.Item>
            </DatePicker>
            <ErrorMsg {...errorMsgProps} errors={state.errors} />
            <DescMsg {...descMsgProps} content={desc} />
          </div>
        )}
      </Field>
    );
  }
}
