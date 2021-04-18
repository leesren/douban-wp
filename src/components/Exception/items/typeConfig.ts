const config = {
  403: {
    title: '糟糕~',
    desc: '您无权访问该页面，CODE：403',
    img: require('../images/no_power@3x.png'),
  },
  404: {
    title: '糟糕~',
    desc: '您访问的页面不存在，CODE：404',
    img: require('../images/404.svg'),
  },
  500: {
    title: '糟糕~',
    desc: '服务器出错了，CODE：500',
    img: require('../images/server_error@3x.png'),
  },
  NoAuth: {
    title: 'APP授权失败',
    desc: '请退出后重新进入应用！',
    img: require('../images/no_power@3x.png'),
  },
  NoAccount: {
    title: '获取用户信息失败',
    desc: '请退出后重新进入应用！',
    img: require('../images/token_expired@3x.png'),
  },
};
export default config;
