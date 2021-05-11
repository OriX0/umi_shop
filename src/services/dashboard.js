/*
 * @Description: dash board apidiaoyong
 * @Version: 1.0
 * @Author: OriX
 * @Date: 2021-05-08 15:50:09
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-08 15:53:21
 */
import request from '@/utils/request';
export async function fetchIndexStatistData() {
  return request('/api/admin/index');
}
