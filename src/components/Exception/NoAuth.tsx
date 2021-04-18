import React from 'react';
import Exception from './items';
import { Button } from 'antd-mobile';
import styles from './index.less';

const NoAppAuth = () => (
  <Exception
    type="NoAuth"
    actions={
      <div className="mlr-lg">
        <Button
          size="large"
          onClick={() => {
            console.warn('NoAuth');
          }}
        >
          立即登录
        </Button>
      </div>
    }
    className={styles.noAppAuth}
  />
);
export default NoAppAuth;
