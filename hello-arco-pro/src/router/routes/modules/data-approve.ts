import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const DATAAPPROVE: AppRouteRecordRaw = {
  path: '/data-approve',
  name: 'dataapprove',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '数据查询与分析',
    icon: 'icon-storage',
    requiresAuth: true,
    order: 7,
  },
  children: [
    // {
    //   path: 'info',
    //   name: 'Info',
    //   component: () => import('@/views/user-own/info/index.vue'),
    //   meta: {
    //     locale: 'menu.user.own.info',
    //     requiresAuth: true,
    //     roles: ['*'],
    //   },
    // },
    {
      path: 'search-table', // The midline path complies with SEO specifications
      name: 'st1',
      component: () => import('@/views/data-approve/search-table/index.vue'),
      meta: {
        locale: '便捷查询',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    // {
    //   path: 'search-table1', // The midline path complies with SEO specifications
    //   name: 'st2',
    //   component: () => import('@/views/data-approve/search-table1/index.vue'),
    //   meta: {
    //     locale: '高级查询',
    //     requiresAuth: true,
    //     roles: ['*'],
    //   },
    // },
    // {
    //   path: 'search-table2', // The midline path complies with SEO specifications
    //   name: 'st3',
    //   component: () => import('@/views/data-approve/search-table2/index.vue'),
    //   meta: {
    //     locale: '可视化分析',
    //     requiresAuth: true,
    //     roles: ['*'],
    //   },
    // },

    // {
    //   path: 'data-analysis', // The midline path complies with SEO specifications
    //   name: 'analysis',
    //   component: () => import('@/views/data-approve/data-analysis/index.vue'),
    //   meta: {
    //     locale: '可视化分析',
    //     requiresAuth: true,
    //     roles: ['*'],
    //   },
    // }

    // {
    //   path: 'setting',
    //   name: 'Setting',
    //   component: () => import('@/views/user-own/setting/index.vue'),
    //   meta: {
    //     locale: 'menu.user.own.setting',
    //     requiresAuth: true,
    //     roles: ['*'],
    //   },
    // },
  ],
};

export default DATAAPPROVE;
