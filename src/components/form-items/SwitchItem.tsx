/**
 * @author shaorencen@yodinfo.com
 * @Component
 * @description
 */
import React, { Component, CSSProperties } from 'react';
import cls from 'classnames';
import { Field } from '@formily/react';
import { List, Switch } from 'antd-mobile';
import { ErrorMsg, BaseFiledProps, DescMsg, RequireTips } from './CommFiled';
import { SwitchPropsType } from 'antd-mobile/lib/switch/PropsType';
interface SwitchItemProps extends BaseFiledProps {
  style?: CSSProperties;
  className?: string;
  switchItemProps?: SwitchPropsType;
}
type State = {};

export default class extends Component<SwitchItemProps, State> {
  state = {};
  static defaultProps = {
    style: {},
    listItemProps: {},
    requireTipsProps: {},
    errorMsgProps: {},
    descMsgProps: {},
    switchItemProps: {},
    labelProps: {},
  };
  constructor(props: SwitchItemProps) {
    super(props);
  }
  componentDidMount() {}

  render() {
    const {
      label,
      desc,
      listItemProps,
      requireTipsProps,
      className,
      style,
      errorMsgProps,
      descMsgProps,
      switchItemProps,
    } = this.props;
    const { required, ...restProps } = this.props;
    return (
      <Field {...restProps}>
        {({ state, mutators }) => (
          <div className={className} style={style}>
            <List.Item
              {...listItemProps}
              extra={
                <Switch
                  {...switchItemProps}
                  checked={state.value}
                  onChange={mutators.change}
                />
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
