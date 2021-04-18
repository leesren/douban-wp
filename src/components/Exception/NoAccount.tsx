import React from 'react';
import Exception from './items';
import { Button } from 'antd-mobile';

const NoAccount = () => (
  <Exception
    type="NoAccount"
    actions={
      <Button
        size="large"
        onClick={() => {
          console.log('暂无账号，请注册');
        }}
      >
        立即注册
      </Button>
    }
  />
);
export default NoAccount;
