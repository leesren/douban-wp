/**
 * @author yanyuqing@yodinfo.com
 * @Component
 * @description checkbox 表单
 */
import React, { Component, CSSProperties } from 'react';
import { BizCheckbox } from 'antd-mobile-exui';
import { List } from 'antd-mobile';
import { Field } from '@formily/react';
import { BaseCheckboxProps } from 'antd-mobile-exui/lib/biz-checkbox/PropsType';
import {
  ErrorMsg,
  BaseFiledProps,
  RadioOptions,
  DescMsg,
  RequireTips,
} from './CommFiled';
import 'antd-mobile-exui/lib/biz-checkbox/style';
import 'antd-mobile/lib/list/style';
interface CheckboxItemProps extends BaseFiledProps {
  style?: CSSProperties;
  className?: string;
  bizCheckboxProps?: BaseCheckboxProps;
  children?: any;
}
export default class extends Component<CheckboxItemProps, any> {
  static defaultProps = {
    style: {},
    listItemProps: {},
    requireTipsProps: {},
    errorMsgProps: {},
    descMsgProps: {},
  };
  constructor(props: CheckboxItemProps) {
    super(props);
  }

  render() {
    const { required, ...restProps } = this.props;
    const {
      label,
      desc,
      listItemProps,
      requireTipsProps,
      className,
      style,
      errorMsgProps,
      descMsgProps,
      bizCheckboxProps,
      children,
    } = this.props;
    return (
      <Field {...restProps}>
        {({ state, mutators }) => (
          <div className={className} style={style}>
            <List.Item {...listItemProps}>
              <BizCheckbox
                {...bizCheckboxProps}
                onChange={e => {
                  mutators.change(e?.target.checked);
                }}
                checked={state.value}
              >
                {children}
              </BizCheckbox>
            </List.Item>
            <ErrorMsg {...errorMsgProps} errors={state.errors} />
            <DescMsg {...descMsgProps} content={desc} />
          </div>
        )}
      </Field>
    );
  }
}
