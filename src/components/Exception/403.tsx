import React from 'react';
import { Link } from 'react-router-dom';
import Exception from './items';
import { Button } from 'antd-mobile';

const ErrorPage403 = () => (
  <Exception
    type="403"
    // actions={
    //   <Button
    //     size="large"
    //     onClick={() => window.mbBridge && window.mbBridge.mb.pop()}
    //   >
    //     退出应用
    //   </Button>
    // }
  />
);
export default ErrorPage403;
