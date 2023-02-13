import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const LIST: AppRouteRecordRaw = {
  path: '/list',
  name: 'list',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.list',
    requiresAuth: true,
    icon: 'icon-list',
    order: 2,
  },
  children: [
    {
      path: 'search-table', // The midline path complies with SEO specifications
      name: 'Search',
      component: () => import('@/views/list/search-table/index.vue'),
      meta: {
        locale: 'menu.list.searchTable',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    // {
    //   path: 'search-table1', // The midline path complies with SEO specifications
    //   name: 'Search1',
    //   component: () => import('@/views/list/search-table1/index.vue'),
    //   meta: {
    //     locale: '高级检索',
    //     requiresAuth: true,
    //     roles: ['*'],
    //   },
    // },
    {
      path: 'success', // The midline path complies with SEO specifications
      name: 'succeed',
      component: () => import('@/views/list/success/index.vue'),
      meta: {
        locale: '成功页',
        requiresAuth: true,
        roles: ['*'],
        hideInMenu: true,
      },
    },
    // {
    //   path: 'card',
    //   name: 'Card',
    //   component: () => import('@/views/list/card/index.vue'),
    //   meta: {
    //     locale: 'menu.list.cardList',
    //     requiresAuth: true,
    //     roles: ['*'],
    //   },
    // },
  ],
};

export default LIST;
