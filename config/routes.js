/*
 * @Description:
 * @Version: 1.0
 * @Author: OriX
 * @Date: 2021-05-05 21:01:35
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-08 17:31:44
 */
export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            authority: ['admin', 'user'],
            routes: [
              {
                path: '/',
                redirect: '/dashboard',
              },
              {
                path: '/dashboard',
                name: 'dashboard',
                icon: 'DashboardOutlined',
                component: '@/Pages/Dashboard',
              },
              {
                path: '/userList',
                name: 'userList',
                icon: 'TeamOutlined',
                component: '@/Pages/UserList',
              },
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
