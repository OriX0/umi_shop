/*
 * @Description: 阿里oss 调用文件
 * @Version: 1.0
 * @Author: OriX
 * @Date: 2021-05-12 11:09:43
 * @LastEditors: OriX
 * @LastEditTime: 2021-05-13 13:14:43
 */
import request from '@/utils/request';
export async function getOssToken() {
  return request.get('/api/auth/oss/token');
}
