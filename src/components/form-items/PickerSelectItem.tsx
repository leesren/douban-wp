/**
 * @author shaorencen@yodinfo.com
 * @Component
 * @description
 */
import React, { Component, CSSProperties } from 'react';
import cls from 'classnames';
import { Form, Field, createFormActions } from '@formily/react';
import { BizRadio, BizPopup } from 'antd-mobile-exui';
import { List } from 'antd-mobile';
import { ErrorMsg, BaseFiledProps, DescMsg, RequireTips } from './CommFiled';

interface PickerSelectItemProps extends BaseFiledProps {
  options: RadioPopupProps['options'];
  style?: CSSProperties;
  className?: string;
  radioPopupProps?: Omit<RadioPopupProps, 'options' | 'onChange'>;
}
type State = {};

export default class extends Component<PickerSelectItemProps, State> {
  state = {};
  static defaultProps = {
    options: [],
    style: {},
    radioPopupProps: {},

    listItemProps: {},
    requireTipsProps: {},
    errorMsgProps: {},
    descMsgProps: {},
  };
  constructor(props: PickerSelectItemProps) {
    super(props);
  }

  render() {
    const {
      options,
      label,
      className,
      style,
      placeholder,
      radioPopupProps,
      desc,
      listItemProps,
      requireTipsProps,
      errorMsgProps,
      descMsgProps,
    } = this.props;
    const { required, ...restProps } = this.props;
    return (
      <Field {...restProps}>
        {({ state, mutators }) => (
          <div className={className} style={style}>
            <RadioPopup
              {...radioPopupProps}
              options={options}
              value={state.value || ''}
              onChange={mutators.change}
              disabled={!state.editable}
            >
              {(modalProps: any) => {
                const activeItem = options.find(e => e.value === state.value);
                return (
                  <React.Fragment>
                    <List.Item
                      {...listItemProps}
                      arrow="horizontal"
                      onClick={modalProps.onShow}
                      extra={
                        activeItem ? activeItem.label : placeholder || null
                      }
                    >
                      {label}
                      {required && <RequireTips {...requireTipsProps} />}
                    </List.Item>

                    <ErrorMsg {...errorMsgProps} errors={state.errors} />
                    <DescMsg {...descMsgProps} content={desc} />
                  </React.Fragment>
                );
              }}
            </RadioPopup>
          </div>
        )}
      </Field>
    );
  }
}
export interface RadioOptions {
  label: string;
  value: any;
  [key: string]: any;
}
export interface RadioPopupProps {
  onChange: (value: any) => any;
  options: RadioOptions[];
  value?: any;
  disabled?: boolean;
  popupBoxContainerStyle?: CSSProperties;
  popupBoxContainerClassName?: string;
  style?: CSSProperties;
  className?: string;
}
class RadioPopup extends Component<RadioPopupProps> {
  static defaultProps = {
    style: {},
    popupBoxContainerStyle: {},
  };
  state = {
    visible: false,
  };
  show = () => {
    if (this.props.options.length == 0) {
    }
    this.setState({ visible: true });
  };
  hide = () => {
    this.setState({ visible: false });
  };
  rootRef: HTMLDivElement | null = null;
  render() {
    const {
      children,
      options,
      onChange,
      value,
      popupBoxContainerStyle,
      popupBoxContainerClassName,
      style,
      className,
    } = this.props;
    let { visible } = this.state;

    return (
      <div className={className} style={style}>
        <div ref={ref => (this.rootRef = ref)}>
          {typeof children == 'function'
            ? children({
                onShow: this.show,
              })
            : children}
        </div>
        {this.rootRef && (
          <BizPopup
            visible={visible}
            direction="center"
            width="70%"
            mountContainer={() => {
              return this.rootRef as HTMLDivElement;
            }}
            onMaskClick={() => {
              this.setState({ visible: false });
            }}
          >
            <div
              className={cls('popup-box', popupBoxContainerClassName)}
              style={{
                borderRadius: 6,
                overflow: 'auto',
                maxHeight: 300,
                ...popupBoxContainerStyle,
              }}
            >
              <BizRadio.Group
                type="cell"
                value={value}
                onChange={(e, index) => {
                  this.setState({ visible: false }, () => {
                    onChange && onChange(e);
                  });
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
            </div>
          </BizPopup>
        )}
      </div>
    );
  }
}
