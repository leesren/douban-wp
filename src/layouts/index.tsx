/**
 * @author shaorencen@yodinfo.com
 * @flow
 * @description
 */
import React, { Component } from 'react';
// @ts-ignore
import { BizActionBar, BizLoading } from 'antd-mobile-exui';
// import  from 'antd-mobile-exui/lib/biz-loading';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
// @ts-ignore
import style from './index.less';
import { NavBarTotalHeight, NavStatusHeight } from '@/components/SafeTop';
import { connect, DispatchProp } from 'dva';
import { GlobalModelState } from '@/models/global';
import { Redirect, RouterChildContext } from 'react-router';
import { UmiRouterProps } from '..';
import { Loading } from '@/models/connect';
import { Icon } from 'antd-mobile';
interface Props extends DispatchProp {
  global: GlobalModelState;
}
type State = {};
class BasicLayout extends Component<Props & UmiRouterProps> {
  UNSAFE_componentWillMount() {
    const { global, history, dispatch } = this.props;
    if (global.userInfo === undefined && global.isFetchAuth == true) {
      dispatch({ type: 'global/fetch' });
    }
  }
  componentDidMount() {}
  render() {
    const {
      children,
      location: { pathname = '/' },
      route: { routes },
      global,
      history,
    } = this.props;

    if (global.isFetchAuth) {
      return (
        <div
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div className="tx-c">
            <BizLoading ios size="lg" />
            <div className="fs15 txc-content mt-md"> 加载中...</div>
          </div>
        </div>
      );
    }
    if (!global.userInfo) {
      return <Redirect to="/user/login" />;
    }
    const page = routes.find((e: any) => e.path === pathname);
    return (
      <TransitionGroup style={{ height: '100%' }}>
        <CSSTransition
          style={{
            minHeight: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
          key={pathname}
          classNames="layout"
          timeout={250}
        >
          <div>
            <div className={style['navHeader']}>
              <div
                style={{
                  paddingTop: NavStatusHeight,
                  backgroundColor: 'white',
                }}
              ></div>
              <BizActionBar.BarNav
                showBottomLine
                className="myHeader"
                onClickLeft={(e: any) => {
                  history.goBack();
                }}
                renderLeft={() => {
                  return (
                    <Icon
                      type="left"
                      style={{ color: '#666', width: 34, height: 34 }}
                      size="md"
                    />
                  );
                }}
              >
                {page ? page.title : '首页'}
              </BizActionBar.BarNav>
            </div>
            <div
              className="flex1 fbox fbox-v"
              style={{ paddingTop: NavBarTotalHeight }}
            >
              {children}
            </div>
          </div>
        </CSSTransition>
      </TransitionGroup>
    );
  }
}

export default connect(
  (argv: { global: GlobalModelState; loading: Loading }) => {
    return {
      global: argv.global,
      loading: argv.loading,
    };
  },
)(BasicLayout);
