/*
 * @Description:
 * @Version: 1.0
 * @Author: OriX
 * @Date: 2021-05-05 21:01:35
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-07 19:18:40
 */
import request from '@/utils/request';
export async function fakeAccountLogin(params) {
  return request('/api/auth/login', {
    method: 'POST',
    data: params,
  });
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
export async function clearAndLoginOut() {
  return request.post('/api/auth/logout');
}
