/*
 * @Description:
 * @Version: 1.0
 * @Author: OriX
 * @Date: 2021-05-05 21:01:35
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-14 14:44:23
 */
import request from '@/utils/request';
export async function query() {
  return request('/api/users');
}
export async function queryCurrent() {
  return request('/api/admin/user');
}
export async function queryNotices() {
  return request('/api/notices');
}

/* 获取所有的用户列表
 *
 *
 * @export
 * @param {*} params
 * @return {*}
 */
export async function getUserList(params) {
  // console.log('search params:', params);
  return request('/api/admin/users', { params });
}

/** 禁用启用 用户
 * @export
 * @param {int} userId
 * @return {pormase}
 */
export async function changeUserLock(userId) {
  return request.patch(`/api/admin/users/${userId}/lock`);
}
// 新增用户
export async function addUser(params) {
  return request.post('/api/admin/users', { params });
}
// 修改用户
export async function updateUser(editId, data) {
  return request.put(`/api/admin/users/${editId}`, { data });
}

// 获取用户详情
export async function getUserInfo(userId) {
  return request.get(`/api/admin/users/${userId}`);
}
