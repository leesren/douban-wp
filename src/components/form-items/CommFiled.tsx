/**
 * @author shaorencen@yodinfo.com
 * @Component
 * @description
 */
import React, { Component, CSSProperties } from 'react';
import cls from 'classnames';

import { ListItemProps } from 'antd-mobile/lib/list/ListItem';
export interface BaseLabelProps {
  style?: CSSProperties;
  className?: string;
}
export interface BaseFiledProps {
  label: any;
  name: string;
  disabled?: boolean;
  editable?: boolean;
  style?: CSSProperties;
  className?: string;
  initialValue?: any;
  required?: boolean;
  rules?: any[];
  value?: any;
  placeholder?: any;
  desc?: any;
  labelProps?: FieldLabelProps;
  descMsgProps?: Omit<DescMsgProps, 'content'>;
  errorMsgProps?: Omit<ErrorMsgProps, 'errors'>;
  listItemProps?: ListItemProps;
  requireTipsProps?: RequireTipsProps;
}
export interface RadioOptions {
  label: string;
  value: any;
  [key: string]: any;
}
export type ErrorMsgProps = {
  errors: any[];
  style?: CSSProperties;
  className?: string;
};
type State = {};

export class ErrorMsg extends Component<ErrorMsgProps, State> {
  static defaultProps = {
    style: {},
  };

  state = {};
  constructor(props: ErrorMsgProps) {
    super(props);
  }
  render() {
    const { errors, style, className } = this.props;
    if (!errors || !Array.isArray(errors) || errors.length == 0) {
      return null;
    }
    return (
      <div
        style={{
          backgroundColor: '#fff6e5',
          color: '#e2b568',
          ...style,
        }}
        className={cls('bg-warning  ptb-sm plr-md fs14', className)}
      >
        {errors}
      </div>
    );
  }
}

export type DescMsgProps = {
  content: any;
  style?: CSSProperties;
  className?: string;
};
export class DescMsg extends Component<DescMsgProps, State> {
  static defaultProps = {
    style: {},
  };

  state = {};
  constructor(props: DescMsgProps) {
    super(props);
  }
  render() {
    const { content, style, className } = this.props;
    if (!content) {
      return null;
    }
    return (
      <div
        style={{
          backgroundColor: '#f4f7fc',
          color: '#babdc2',
          ...style,
        }}
        className={cls('bg-warning  ptb-xs plr-md fs10', className)}
      >
        {content}
      </div>
    );
  }
}
export type RequireTipsProps = {
  style?: CSSProperties;
  className?: string;
};
export class RequireTips extends Component<RequireTipsProps, State> {
  static defaultProps = {
    style: {},
  };

  constructor(props: RequireTipsProps) {
    super(props);
  }
  render() {
    const { style, className } = this.props;
    return (
      <span style={style} className={cls('txc-error', className)}>
        *
      </span>
    );
  }
}
export type FieldLabelProps = {
  style?: CSSProperties;
  className?: string;
  required?: boolean;
  requireTipsProps?: RequireTipsProps;
};
export class FieldLabel extends Component<FieldLabelProps, State> {
  static defaultProps = {
    style: {},
    requireTipsProps: {},
  };

  constructor(props: RequireTipsProps) {
    super(props);
  }
  render() {
    const {
      style,
      className,
      children,
      required,
      requireTipsProps,
    } = this.props;
    return (
      <div
        style={style}
        className={cls('txc-base ptb-sm fs17 pl-md', className)}
      >
        {children}
        {required && <RequireTips {...requireTipsProps} />}
      </div>
    );
  }
}
