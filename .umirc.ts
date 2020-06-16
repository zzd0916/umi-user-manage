import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  proxy: {
    '/api': {
      // 'target': 'http://public-api-v1.aspirantzhang.com',
      'target': 'http://192.168.0.246:7001/',
      'changeOrigin': true,
      'pathRewrite': { '^/api' : '' },
    },
  },
  autoprefixer: {
    flexbox: 'no-2009'
  }
  // antd: {
  //   dark: true
  // },
  // layout:{
  //   name: 'Ant Design', 
  //   locale: true,
  // }
});
