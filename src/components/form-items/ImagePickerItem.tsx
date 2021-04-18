/**
 * @author shaorencen@yodinfo.com
 * @Component
 * @description
 */
import React, { Component, CSSProperties } from 'react';
import cls from 'classnames';
import { Field } from '@formily/react';
import { ImagePicker } from 'antd-mobile';
import './InputItem.less';
import { ImagePickerPropTypes } from 'antd-mobile/lib/image-picker/PropsType';
import { FieldLabel } from './CommFiled';
import { ErrorMsg, BaseFiledProps, DescMsg, RequireTips } from './CommFiled';

interface ImagePickerItemProps extends BaseFiledProps {
  style?: CSSProperties;
  className?: string;
  focus?: boolean;
  imagePickerProps?: ImagePickerPropTypes;
}
type State = {};

export default class extends Component<ImagePickerItemProps, State> {
  state = {};
  static defaultProps = {
    style: {},
    imagePickerProps: {},
    requireTipsProps: {},
    labelProps: {},
    errorMsgProps: {},
    descMsgProps: {},
    layout: 'row',
  };
  inputRef: any;
  constructor(props: ImagePickerItemProps) {
    super(props);
  }
  componentDidMount() {
    const { focus } = this.props;
    if (this.inputRef && focus) {
      // @ts-ignore
      window.inputRef = this.inputRef;
      setTimeout(() => {
        this.inputRef.focus();
      }, 400);
    }
  }

  render() {
    const {
      label,
      desc,
      imagePickerProps,
      requireTipsProps,
      className,
      style,
      labelProps,
      errorMsgProps,
      descMsgProps,
    } = this.props;
    const { required, ...restProps } = this.props;
    return (
      <Field {...restProps}>
        {({ state, mutators }) => (
          <div className={className} style={style}>
            <FieldLabel
              {...labelProps}
              required={required}
              requireTipsProps={requireTipsProps}
            >
              {label}
            </FieldLabel>
            <ImagePicker
              {...imagePickerProps}
              files={state.value}
              onChange={mutators.change}
            />
            <ErrorMsg {...errorMsgProps} errors={state.errors} />
            <DescMsg {...descMsgProps} content={desc} />
          </div>
        )}
      </Field>
    );
  }
}
