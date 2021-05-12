/*
 * @Description: 分类---services
 * @Version: 1.0
 * @Author: OriX
 * @Date: 2021-05-12 09:23:25
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-12 09:25:14
 */
import request from '@/utils/request';
export async function getCategoryList() {
  return request.get('/api/admin/category');
}
