/*
 * @Description:
 * @Version: 1.0
 * @Author: OriX
 * @Date: 2021-05-05 21:01:35
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-06 19:07:42
 */
import request from '@/utils/request';
export async function query() {
  return request('/api/users');
}
export async function queryCurrent() {
  // return request('/api/currentUser');
  return request.post('/api/auth/login');
}
export async function queryNotices() {
  return request('/api/notices');
}
