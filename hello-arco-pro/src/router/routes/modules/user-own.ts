import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const USEROWN: AppRouteRecordRaw = {
  path: '/user-own',
  name: 'user-own',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.user.own',
    icon: 'icon-user',
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
      name: 'SearchTable',
      component: () => import('@/views/user-own/search-table/index.vue'),
      meta: {
        locale: '我的申请',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'setting',
      name: 'Setting',
      component: () => import('@/views/user-own/setting/index.vue'),
      meta: {
        locale: 'menu.user.own.setting',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default USEROWN;
