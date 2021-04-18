/**
 * @author shaorencen@yodinfo.com
 * @Component
 * @description
 */
import React, { Component, CSSProperties } from 'react';
import cls from 'classnames';
import { Field } from '@formily/react';
import { TextareaItem } from 'antd-mobile';
import './InputItem.less';
import { TextAreaItemPropsType } from 'antd-mobile/lib/textarea-item/PropsType';
import { FieldLabel } from './CommFiled';
import { ErrorMsg, BaseFiledProps, DescMsg, RequireTips } from './CommFiled';

interface TextareaItemProps extends BaseFiledProps {
  style?: CSSProperties;
  className?: string;
  focus?: boolean;
  inputItemProps?: TextAreaItemPropsType & { className?: string };
  layout?: 'column' | 'row';
}
type State = {};

export default class extends Component<TextareaItemProps, State> {
  state = {};
  static defaultProps = {
    style: {},
    inputItemProps: {},
    requireTipsProps: {},
    labelProps: {},
    errorMsgProps: {},
    descMsgProps: {},
    layout: 'row',
  };
  inputRef: any;
  constructor(props: TextareaItemProps) {
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
      inputItemProps,
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
            {layout === 'column' && label && (
              <FieldLabel
                {...labelProps}
                required={required}
                requireTipsProps={requireTipsProps}
              >
                {label}
              </FieldLabel>
            )}
            <TextareaItem
              ref={(ref: any) => (this.inputRef = ref)}
              {...inputItemProps}
              onChange={mutators.change}
              onBlur={mutators.blur}
              onFocus={mutators.focus}
              value={state.value}
              placeholder={placeholder}
            >
              {layout !== 'column' ? (
                <React.Fragment>
                  {label}
                  {required && <RequireTips {...requireTipsProps} />}
                </React.Fragment>
              ) : null}
            </TextareaItem>
            <ErrorMsg {...errorMsgProps} errors={state.errors} />
            <DescMsg {...descMsgProps} content={desc} />
          </div>
        )}
      </Field>
    );
  }
}
