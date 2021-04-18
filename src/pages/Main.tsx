/**
 * @author shaorencen@yodinfo.com
 * @description
 */
import { ImagePicker, List, TextareaItem } from 'antd-mobile';
// @ts-ignore
import { v4 as uuidv4 } from 'uuid';
import React, { Component } from 'react';
import 'antd-mobile/lib/input-item/style/index.less';
import { BizActionBar, BizOptions } from 'antd-mobile-exui';
import styles from './index.less';
import { HomeModelState } from './models/home';
import router from 'umi/router';
import { connect, DispatchProp } from 'dva';
// @ts-ignore
import { createForm, formShape } from 'rc-form';
// @ts-ignore
interface Props extends DispatchProp {
    home: HomeModelState;
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

    componentWillMount() {
        const { dispatch } = this.props
        dispatch({ type: 'home/fetchGroup', payload: {} })
    }

    render() {
        const {
            home,
        } = this.props;
        let { options } = this.state;
        return (
            <div className="ptb-lg">
                <List renderHeader={() => '小组'} className="my-list">
                    {
                        (home.groups || []).map((el: any, index) => {
                            return <List.Item
                                key={index}
                                arrow="horizontal"
                                thumb={el.pic}

                                onClick={() => {
                                    router.push('/list?groupId=' + el.id)
                                }}
                            >{
                                    el.name
                                }</List.Item>
                        })
                    }

                </List>
                <List renderHeader={() => '收藏'} className="my-list">
                    <List.Item
                        arrow="horizontal"

                        onClick={() => {
                            router.push('/like')
                        }}
                    >查看收藏了列表</List.Item>

                </List>
            </div>
        );
    }
}
export default connect(({ home }: { home: HomeModelState }) => ({
    home,
}))(Page);
