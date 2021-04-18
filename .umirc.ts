import { IConfig } from 'umi-types';
const px2Rem = require('postcss-pxtorem');
const remConfig = require('./postcss.config');
// ref: https://umijs.org/config/
const config: IConfig = {
  publicPath: '/douban/',
  base: '/douban/',
  treeShaking: true,
  hash: true,
  outputPath: 'douban',
  routes: [
    {
      path: '/user',
      component: '../layouts/SimpleLayout',
      routes: [
        {
          path: '/user/login',
          title: '登录',
          component: '../pages/user/login/index',
        },
      ],
    },
    {
      path: '/exception',
      component: '../layouts/index',
      routes: [
        {
          path: '/exception/404',
          title: '异常',
          component: '../components/Exception/404',
        },
        {
          path: '/exception/403',
          title: '异常',
          component: '../components/Exception/403',
        },
        {
          path: '/exception/500',
          title: '异常',
          component: '../components/Exception/500',
        },
        {
          path: '/exception/NoAccount',
          title: '异常',
          component: '../components/Exception/NoAccount',
        },
        {
          path: '/exception/NoAuth',
          title: '异常',
          component: '../components/Exception/NoAuth',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        { path: '/', component: '../pages/Main', title: '首页' },
        { path: '/like', component: '../pages/Index', title: '收藏列表' },
        { path: '/list', component: '../pages/Home', title: '列表' },

        // {
        //   path: '/edit',
        //   component: '../pages/edit/index',
        //   title: '编辑',
        // },
        {
          path: '/SubjectType',
          component: '../pages/edit/SubjectType',
          title: '编辑类目',
        },
        {
          path: '/Leave',
          component: '../pages/edit/Leave',
          title: '请假-@formily',
        },
      ],
    },
  ],

  extraBabelPlugins: [
    [
      'import',
      { libraryName: 'antd-mobile-exui', style: true },
      'antd-mobile-exui',
    ], //按需加载antd-mobile样式文件
    ['import', { libraryName: 'antd-mobile', style: true }, 'antd-mobile'], //按需加载antd-mobile样式文件
  ],
  extraPostCSSPlugins: [px2Rem(remConfig.plugins['postcss-pxtorem'])],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: false,
        dva: true,
        fastClick: true,
        dynamicImport: { webpackChunkName: true },
        title: 'knowledge-base',
        dll: true,

        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
      },
    ],
  ],
  theme: {
    '@brand-primary': '#e211cc',
  },
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:7001',
      changeOrigin: true,
      // pathRewrite: { '^/api': '' },
    },
    '/rent': {
      target: 'http://127.0.0.1:7003',
      changeOrigin: true,
      // pathRewrite: { '^/api': '' },
    },
  },
};

export default config;
