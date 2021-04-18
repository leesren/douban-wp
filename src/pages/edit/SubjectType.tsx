/**
 * @author shaorencen@yodinfo.com
 * @description
 */
import { ImagePicker, TextareaItem } from 'antd-mobile';
// @ts-ignore
import { v4 as uuidv4 } from 'uuid';
import React, { Component } from 'react';
import 'antd-mobile/lib/input-item/style/index.less';
import { BizActionBar, BizOptions } from 'antd-mobile-exui';
import styles from './index.less';
// @ts-ignore
import { createForm, formShape } from 'rc-form';
// @ts-ignore
interface Props {
  form: formShape;
}
interface State {
  options: Array<any>;
}

/****
 *
 * ps 这个是 rc-form 的例子，但是 rc-form 问题比较多，推荐改成 formily 的形式
 * ps 这个是 rc-form 的例子，但是 rc-form 问题比较多，推荐改成 formily 的形式
 * ps 这个是 rc-form 的例子，但是 rc-form 问题比较多，推荐改成 formily 的形式
 * ps 这个是 rc-form 的例子，但是 rc-form 问题比较多，推荐改成 formily 的形式
 * ps 这个是 rc-form 的例子，但是 rc-form 问题比较多，推荐改成 formily 的形式
 *
 * 使用方式可以参考 Leave.tsx 的页面，文档看官网
 */

class Page extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }
  state: State = {
    options: [],
  };

  componentWillMount() {}

  render() {
    const {
      form: { getFieldProps, validateFields, getFieldDecorator },
    } = this.props;
    let { options } = this.state;
    return (
      <div>
        <div className="pt-lg" style={{ paddingBottom: 120 }}>
          <div className="am-list-header">请添加类目</div>
          <BizOptions
            options={options}
            getFieldProps={getFieldProps}
            className={styles['myOptions']}
            onAdd={() => {
              // 这里的name 必须唯一，不然删除会出现问题
              const name = Date.now() + '';
              options.push({
                name: uuidv4(),
                initialValue: '',
                checked: false,
                rules: [{ required: false, message: '必填' }],
              });
              this.setState({ options: [...options] });
            }}
            onDelete={(item, index, rest) => {
              this.setState({ options: rest });
            }}
          />
        </div>
        <div className={'bg-white ' + styles['navFooter']}>
          <div className="p-lg">
            <BizActionBar.BarButton
              size="small"
              type="warning"
              rounded
              onClick={() => {
                validateFields((error: any, value: any) => {
                  if (error) {
                    console.error(error);
                    return;
                  }
                  console.log(value);
                });
              }}
              style={{
                height: 40,
                lineHeight: '40px',
                backgroundColor: 'rgb(114, 50, 221)',
                flex: 3,
              }}
            >
              提交
            </BizActionBar.BarButton>
          </div>
        </div>
      </div>
    );
  }
}
export default createForm()(Page);
