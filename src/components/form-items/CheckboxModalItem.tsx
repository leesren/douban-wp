/**
 * @author shaorencen@yodinfo.com
 * @Component
 * @description
 */
import React, { Component, CSSProperties } from 'react';
import cls from 'classnames';
import { Form, Field, createFormActions } from '@formily/react';
import { BizCheckbox, BizPopup, BizButton } from 'antd-mobile-exui';
import { Flex, List } from 'antd-mobile';
import { isEqual } from 'lodash';
import { ErrorMsg, BaseFiledProps, DescMsg, RequireTips } from './CommFiled';

interface CheckboxModalItemProps extends BaseFiledProps {
  options: RadioPopupProps['options'];
  style?: CSSProperties;
  className?: string;
  radioPopupProps?: Omit<RadioPopupProps, 'options' | 'onChange'>;
}
type State = {};

export default class extends Component<CheckboxModalItemProps, State> {
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
  constructor(props: CheckboxModalItemProps) {
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
              value={state.value || []}
              onChange={mutators.change}
              disabled={!state.editable}
            >
              {(modalProps: any) => {
                const ls = state.value.map((e: any) =>
                  options.find(opt => opt.value == e),
                );
                console.log(ls);
                return (
                  <React.Fragment>
                    <List.Item
                      {...listItemProps}
                      arrow="horizontal"
                      onClick={modalProps.onShow}
                      extra={
                        Array.isArray(state.value) && state.value.length > 0
                          ? ls.map((e: any) => e.label).join('、')
                          : placeholder || null
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
  popupBoxCBStyle?: CSSProperties;
  popupBoxCBClassName?: string;
  style?: CSSProperties;
  className?: string;
}
class RadioPopup extends Component<RadioPopupProps, any> {
  static defaultProps = {
    style: {},
    popupBoxCBStyle: {},
    value: [],
    popupBoxContainerStyle: {},
  };
  constructor(props: RadioPopupProps) {
    super(props);
    this.state = {
      visible: false,
      value: props.value,
    };
  }
  componentWillReceiveProps(nextProps: RadioPopupProps) {
    if (!isEqual(nextProps.value, this.props.value)) {
      this.setState({
        value: nextProps.value,
      });
    }
  }
  show = () => {
    if (!isEqual(this.props.value, this.state.value)) {
      this.setState({
        value: this.props.value,
      });
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
      popupBoxContainerStyle,
      popupBoxContainerClassName,
      style,
      className,
      popupBoxCBStyle,
      popupBoxCBClassName,
      ...restProps
    } = this.props;
    let { visible, value } = this.state;

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
            direction="center"
            width="70%"
            {...(restProps as any)}
            visible={visible}
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
                overflow: 'hidden',
                ...popupBoxContainerStyle,
              }}
            >
              <div
                className={popupBoxCBClassName}
                style={{
                  maxHeight: 300,
                  overflowY: 'auto',
                  ...popupBoxCBStyle,
                }}
              >
                <BizCheckbox.Group
                  type="cell"
                  value={value}
                  onChange={e => {
                    this.setState({
                      value: e,
                    });
                  }}
                >
                  {options.map((el: any, index: number) => {
                    return (
                      <BizCheckbox
                        value={el.value}
                        disabled={!!el.disabled}
                        key={index}
                      >
                        {el.label}
                      </BizCheckbox>
                    );
                  })}
                </BizCheckbox.Group>
              </div>
              <div className="bg-white fbox">
                <BizButton
                  className="flex1"
                  type="ghost"
                  onClick={() => {
                    onChange && onChange(this.props.value);
                    this.setState({ visible: false });
                  }}
                >
                  <span className="txc-content">取消</span>
                </BizButton>
                <BizButton
                  className="flex1"
                  type="ghost"
                  onClick={() => {
                    this.setState({ visible: false });
                    onChange && onChange(this.state.value);
                  }}
                >
                  确定
                </BizButton>
              </div>
            </div>
          </BizPopup>
        )}
      </div>
    );
  }
}
