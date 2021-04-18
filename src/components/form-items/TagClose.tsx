/**
 * @author shaorencen@yodinfo.com
 * @Component
 * @description
 */
import React, { Component, CSSProperties } from 'react';
import cls from 'classnames';
import styles from './TagClose.less';
import { Icon } from 'antd-mobile';
import { IconPropsType } from 'antd-mobile/lib/icon/PropsType';
type Props = {
  style?: CSSProperties;
  className?: string;
  iconProps?: IconPropsType;
  onClose?: Function;
};
type State = {};

export default class TagClose extends Component<Props, State> {
  state = {
    show: true,
  };
  constructor(props: Props) {
    super(props);
  }
  close = (e: any) => {
    const { onClose } = this.props;
    e.stopPropagation();
    this.setState(
      {
        show: false,
      },
      onClose as any,
    );
  };
  render() {
    const { style, className, children, iconProps } = this.props;
    let { show } = this.state;
    if (!show) {
      return null;
    }
    return (
      <span style={style} className={cls(styles['tag-close'], className)}>
        <span className="tx-vm">{children}</span>
        <Icon type={'cross'} {...iconProps} onClick={this.close} />
      </span>
    );
  }
}
