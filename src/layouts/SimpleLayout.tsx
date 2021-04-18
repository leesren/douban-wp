/**
 * @author shaorencen@yodinfo.com
 * @flow
 * @description
 */
import React, { Component } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
type Props = {};
type State = {};
class SimpleLayout extends Component<any> {
  render() {
    const {
      children,
      location: { pathname = '/' },
    } = this.props;
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
          timeout={300}
        >
          <div>{children}</div>
        </CSSTransition>
      </TransitionGroup>
    );
  }
}

export default SimpleLayout;
